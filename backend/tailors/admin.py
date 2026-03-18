from django.contrib import admin
from .models import TailorProfile, PortfolioItem


@admin.register(TailorProfile)
class TailorProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'wilaya', 'city', 'is_verified', 'is_available', 'avg_rating', 'total_orders']
    list_filter = ['is_verified', 'is_available', 'wilaya']
    search_fields = ['user__email', 'user__full_name', 'city']
    actions = ['verify_tailors', 'unverify_tailors', 'toggle_availability']

    def verify_tailors(self, request, queryset):
        updated = queryset.update(is_verified=True)
        self.message_user(request, f'{updated} tailor(s) verified.')
    verify_tailors.short_description = 'Verify selected tailors'

    def unverify_tailors(self, request, queryset):
        updated = queryset.update(is_verified=False)
        self.message_user(request, f'{updated} tailor(s) unverified.')
    unverify_tailors.short_description = 'Unverify selected tailors'

    def toggle_availability(self, request, queryset):
        for profile in queryset:
            profile.is_available = not profile.is_available
            profile.save(update_fields=['is_available'])
    toggle_availability.short_description = 'Toggle availability'


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ['tailor', 'caption', 'created_at']
    list_filter = ['created_at']
