mysql -u root -p < ..\initial_setup.sql
del .\content\migrations\*.py
del .\core\migrations\*.py
python manage.py makemigrations core
python manage.py makemigrations content
copy ..\easy_install_files\0002_initial_setup_core.py .\core\migrations
copy ..\easy_install_files\0002_initial_setup_content.py .\content\migrations
python manage.py migrate
echo 'Installation Completed'