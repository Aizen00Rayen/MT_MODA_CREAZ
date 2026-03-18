import json
import logging
import re

from django.conf import settings
from rest_framework.exceptions import ValidationError

logger = logging.getLogger(__name__)

DEFAULT_PALETTE = ['#C9A84C', '#0A0A0A', '#FAFAFA', '#1A1A1A', '#E8C97A']


class AIDesignService:
    def __init__(self):
        import openai
        self.client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

    def enhance_prompt(self, user_prompt: str, style_tags: list) -> str:
        try:
            system_prompt = (
                "You are a luxury fashion designer specializing in Algerian haute couture. "
                "Enhance the given prompt into a detailed, photorealistic fashion illustration "
                "description. Include fabric texture, draping, lighting, color palette, and "
                "cultural elements when relevant. Return ONLY the enhanced prompt, no explanation."
            )
            tags_str = ', '.join(style_tags) if style_tags else 'elegant'
            response = self.client.chat.completions.create(
                model='gpt-4o',
                messages=[
                    {'role': 'system', 'content': system_prompt},
                    {'role': 'user', 'content': f'Prompt: {user_prompt}\nStyle tags: {tags_str}'},
                ],
                max_tokens=500,
            )
            return response.choices[0].message.content
        except Exception as e:
            import openai
            if isinstance(e, openai.RateLimitError):
                raise ValidationError('Service temporarily unavailable. Try again in a moment.')
            if isinstance(e, openai.AuthenticationError):
                raise ValidationError('AI service configuration error.')
            logger.error(f'Prompt enhancement failed: {e}')
            return f'Luxury Algerian fashion design: {user_prompt}. Style: {", ".join(style_tags)}'

    def generate_image(self, enhanced_prompt: str) -> str:
        try:
            import cloudinary.uploader
            response = self.client.images.generate(
                model='dall-e-3',
                prompt=(
                    f'Luxury fashion illustration, haute couture algérienne: {enhanced_prompt}. '
                    f'Dark elegant background, editorial photography style, high fashion. '
                    f'No text, no watermarks.'
                ),
                size='1024x1024',
                quality='hd',
                n=1,
            )
            temp_url = response.data[0].url
            upload_result = cloudinary.uploader.upload(
                temp_url,
                folder='mt_moda_creaz/designs',
                resource_type='image',
            )
            return upload_result['secure_url']
        except Exception as e:
            logger.error(f'DALL-E generation failed: {e}')
            raise ValidationError('Image generation failed. Please try a different prompt.')

    def extract_color_palette(self, prompt: str) -> list:
        try:
            response = self.client.chat.completions.create(
                model='gpt-4o',
                messages=[{
                    'role': 'user',
                    'content': (
                        f'Extract exactly 5 hex color codes that represent this fashion design: '
                        f'{prompt}. Return ONLY a JSON array like ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5"]. '
                        f'No explanation, just the array.'
                    ),
                }],
                max_tokens=100,
            )
            content = response.choices[0].message.content.strip()
            # Extract JSON array from response
            match = re.search(r'\[.*?\]', content, re.DOTALL)
            if match:
                colors = json.loads(match.group())
                if isinstance(colors, list) and len(colors) >= 1:
                    return colors[:5]
        except Exception as e:
            logger.warning(f'Color extraction failed: {e}')
        return DEFAULT_PALETTE

    def generate_design(self, user_id, prompt_text: str, style_tags: list):
        from .models import Design
        enhanced = self.enhance_prompt(prompt_text, style_tags)
        image_url = self.generate_image(enhanced)
        try:
            colors = self.extract_color_palette(enhanced)
        except Exception:
            colors = DEFAULT_PALETTE

        design = Design.objects.create(
            client_id=user_id,
            prompt_text=prompt_text,
            style_tags=style_tags,
            generated_image_url=image_url,
            color_palette=colors,
        )
        return design
