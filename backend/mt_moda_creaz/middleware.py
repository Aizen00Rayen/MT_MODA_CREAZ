from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser


class JWTAuthMiddleware:
    """
    WebSocket JWT authentication via ?token= query string parameter.
    Needed because Django Channels AuthMiddlewareStack uses session cookies,
    not Bearer tokens.
    """

    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        query_string = scope.get('query_string', b'').decode()
        params = parse_qs(query_string)
        token_list = params.get('token', [])

        if token_list:
            token = token_list[0]
            user = await self._get_user_from_token(token)
            scope['user'] = user
        else:
            scope['user'] = AnonymousUser()

        return await self.inner(scope, receive, send)

    @database_sync_to_async
    def _get_user_from_token(self, token):
        try:
            from rest_framework_simplejwt.tokens import AccessToken
            from django.contrib.auth import get_user_model
            User = get_user_model()
            validated = AccessToken(token)
            return User.objects.get(id=validated['user_id'])
        except Exception:
            return AnonymousUser()
