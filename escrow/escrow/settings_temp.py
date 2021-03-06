"""
Django settings for constantsio project.

Generated by 'django-admin startproject' using Django 3.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import dj_database_url
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = (
    '.constants.io',
)

# OAuth2 Settings
# https://django-oauth-toolkit.readthedocs.io/en/latest/settings.html
OAUTH2_PROVIDER = {
    'SCOPES': {
        'constants:read': 'Read Constants',
        'constants:write': 'Create/Update/Delete Constants',
        'organizations:read': 'Read Organizations',
        'organizations:write': 'Create/Update/Delete Organizations',
        'projects:read': 'Read Projects',
        'projects:write': 'Create/Update/Delete Projects',
    },
    'OAUTH2_BACKEND_CLASS': 'oauth2_provider.oauth2_backends.JSONOAuthLibCore'
}

# Django Rest Framework Settings
# https://www.django-rest-framework.org/api-guide/settings/

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
}


# Django Tenant Schemas Settings
# https://django-tenant-schemas.readthedocs.io/en/latest/

PUBLIC_SCHEMA_NAME = 'public'

PUBLIC_SCHEMA_URLCONF = 'constantsio.urls_public'

SHARED_APPS = (
    'tenant_schemas',  # mandatory, should always be before any django app
    'rest_framework',
    'django_filters',

    # everything below here is optional
    'django.contrib.contenttypes',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'organizations',
    'public_website',
)

TENANT_APPS = (
    'constants',
    'organization_website',
    'projects',
    'users',

    'oauth2_provider',

    'django.contrib.sessions',
    'django.contrib.admin',
    'django.contrib.auth',
)

TENANT_MODEL = "organizations.Organization"

# Django Settings
# https://docs.djangoproject.com/en/3.0/topics/settings/

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "frontend", "dist"),
]

INSTALLED_APPS = list(SHARED_APPS) + \
    [app for app in TENANT_APPS if app not in SHARED_APPS]

STATIC_ROOT = os.path.join(BASE_DIR, "static")

DEFAULT_FILE_STORAGE = 'tenant_schemas.storage.TenantFileSystemStorage'

MIDDLEWARE = [
    'tenant_schemas.middleware.TenantMiddleware',

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'constantsio.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.core.context_processors.request',
)

WSGI_APPLICATION = 'constantsio.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

db_config = dj_database_url.parse(os.getenv('CONSTANTSIO_DATABASE_URL'))
db_config['ENGINE'] = 'tenant_schemas.postgresql_backend'
db_config['ATOMIC_REQUESTS'] = True

DATABASES = {
    'default': db_config
}

DATABASE_ROUTERS = (
    'tenant_schemas.routers.TenantSyncRouter',
)

SESSION_ENGINE = "django.contrib.sessions.backends.signed_cookies"
# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators
AUTH_USER_MODEL = 'users.User'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
