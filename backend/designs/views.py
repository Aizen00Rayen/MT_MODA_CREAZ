from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.permissions import IsClient
from .models import Design
from .serializers import DesignSerializer, DesignCreateSerializer
from .services import AIDesignService


class DesignGenerateView(APIView):
    def get_permissions(self):
        # Allow unauthenticated for preview mode
        if self.request.query_params.get('preview') == 'true':
            return [AllowAny()]
        return [IsAuthenticated()]

    def post(self, request):
        serializer = DesignCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        preview = request.query_params.get('preview') == 'true'
        service = AIDesignService()

        if preview and not request.user.is_authenticated:
            # Generate but don't persist
            try:
                enhanced = service.enhance_prompt(
                    serializer.validated_data['prompt_text'],
                    serializer.validated_data['style_tags'],
                )
                image_url = service.generate_image(enhanced)
                colors = service.extract_color_palette(enhanced)
                return Response({
                    'generated_image_url': image_url,
                    'color_palette': colors,
                    'is_preview': True,
                })
            except Exception as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        design = service.generate_design(
            user_id=request.user.id,
            prompt_text=serializer.validated_data['prompt_text'],
            style_tags=serializer.validated_data['style_tags'],
        )
        return Response(DesignSerializer(design).data, status=status.HTTP_201_CREATED)


class DesignListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DesignSerializer

    def get_queryset(self):
        qs = Design.objects.filter(client=self.request.user)
        if self.request.query_params.get('saved') == 'true':
            qs = qs.filter(is_saved=True)
        return qs


class DesignSaveToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            design = Design.objects.get(pk=pk, client=request.user)
            design.is_saved = not design.is_saved
            design.save(update_fields=['is_saved'])
            return Response({'is_saved': design.is_saved})
        except Design.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
