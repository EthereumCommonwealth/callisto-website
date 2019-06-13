# Generated by Django 2.2 on 2019-04-27 21:52

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('translations', '0004_auto_20181216_0005'),
    ]

    operations = [
        migrations.AddField(
            model_name='language',
            name='translation',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='languagetranslation',
            name='language',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='translations.Language'),
        ),
    ]