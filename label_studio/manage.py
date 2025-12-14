#!/usr/bin/env python
"""This file and its contents are licensed under the Apache License 2.0. Please see the included NOTICE for copyright information and LICENSE for a copy of the license.
"""
import os
import sys

# 打印当前的搜索路径，看看第一个是不是你的项目根目录
print("当前工作目录:", os.getcwd())
print("Python搜索路径前三项:", sys.path[:3])

try:
    import label_studio_sdk
    import label_studio_sdk.converter.converter

    # 这一行是关键！它会告诉你 Python 到底用了哪里的文件
    print("SDK 加载路径:", label_studio_sdk.__file__)
    print("Converter 加载路径:", label_studio_sdk.converter.converter.__file__)
except ImportError as e:
    print("导入失败:", e)

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.label_studio')
    # os.environ.setdefault('DEBUG', 'True')
    try:
        from django.conf import settings
        from django.core.management import execute_from_command_line
        from django.core.management.commands.runserver import Command as runserver

        runserver.default_port = settings.INTERNAL_PORT

    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            'available on your PYTHONPATH environment variable? Did you '
            'forget to activate a virtual environment?'
        ) from exc
    execute_from_command_line(sys.argv)
