from django.contrib import admin
from .models import *;
admin.site.register(UserBook)
admin.site.register(BookTransfer)
admin.site.register(WishBook)
admin.site.register(Notification)
