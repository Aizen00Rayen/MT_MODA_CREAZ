from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.conf import settings


WILAYA_CHOICES = [
    ('adrar', 'Adrar'), ('chlef', 'Chlef'), ('laghouat', 'Laghouat'),
    ('oum_el_bouaghi', 'Oum El Bouaghi'), ('batna', 'Batna'), ('bejaia', 'Béjaïa'),
    ('biskra', 'Biskra'), ('bechar', 'Béchar'), ('blida', 'Blida'),
    ('bouira', 'Bouira'), ('tamanrasset', 'Tamanrasset'), ('tebessa', 'Tébessa'),
    ('tlemcen', 'Tlemcen'), ('tiaret', 'Tiaret'), ('tizi_ouzou', 'Tizi Ouzou'),
    ('alger', 'Alger'), ('djelfa', 'Djelfa'), ('jijel', 'Jijel'),
    ('setif', 'Sétif'), ('saida', 'Saïda'), ('skikda', 'Skikda'),
    ('sidi_bel_abbes', 'Sidi Bel Abbès'), ('annaba', 'Annaba'), ('guelma', 'Guelma'),
    ('constantine', 'Constantine'), ('medea', 'Médéa'), ('mostaganem', 'Mostaganem'),
    ('msila', 'M\'Sila'), ('mascara', 'Mascara'), ('ouargla', 'Ouargla'),
    ('oran', 'Oran'), ('el_bayadh', 'El Bayadh'), ('illizi', 'Illizi'),
    ('bordj_bou_arreridj', 'Bordj Bou Arréridj'), ('boumerdes', 'Boumerdès'),
    ('el_tarf', 'El Tarf'), ('tindouf', 'Tindouf'), ('tissemsilt', 'Tissemsilt'),
    ('el_oued', 'El Oued'), ('khenchela', 'Khenchela'), ('souk_ahras', 'Souk Ahras'),
    ('tipaza', 'Tipaza'), ('mila', 'Mila'), ('ain_defla', 'Aïn Defla'),
    ('naama', 'Naâma'), ('ain_temouchent', 'Aïn Témouchent'), ('ghardaia', 'Ghardaïa'),
    ('relizane', 'Relizane'), ('timimoun', 'Timimoun'), ('bordj_badji_mokhtar', 'Bordj Badji Mokhtar'),
    ('ouled_djellal', 'Ouled Djellal'), ('beni_abbes', 'Béni Abbès'),
    ('in_salah', 'In Salah'), ('in_guezzam', 'In Guezzam'),
    ('touggourt', 'Touggourt'), ('djanet', 'Djanet'), ('el_mghair', 'El M\'Ghaïr'),
    ('el_meniaa', 'El Méniaa'),
]

SPECIALTY_CHOICES = [
    ('traditionnel', 'Traditionnel'),
    ('moderne', 'Moderne'),
    ('kabyle', 'Kabyle'),
    ('soiree', 'Soirée'),
    ('mariage', 'Mariage'),
    ('casual', 'Casual'),
    ('boheme', 'Bohème'),
    ('minimaliste', 'Minimaliste'),
    ('haute_couture', 'Haute Couture'),
    ('broderie', 'Broderie'),
]


class TailorProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tailor_profile'
    )
    bio = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    wilaya = models.CharField(max_length=100, choices=WILAYA_CHOICES, blank=True)
    specialties = ArrayField(models.CharField(max_length=50), default=list, blank=True)
    experience_years = models.PositiveIntegerField(default=0)
    profile_photo = models.URLField(blank=True)
    cover_photo = models.URLField(blank=True)
    avg_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_orders = models.PositiveIntegerField(default=0)
    is_verified = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    price_base = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_standard = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_premium = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-avg_rating', '-total_orders']

    def __str__(self):
        return f'TailorProfile({self.user.full_name})'


class PortfolioItem(models.Model):
    tailor = models.ForeignKey(TailorProfile, on_delete=models.CASCADE, related_name='portfolio')
    image_url = models.URLField()
    caption = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Portfolio({self.tailor.user.full_name} - {self.id})'
