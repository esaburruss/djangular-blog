mysql -u root < initial_setup.sql
cd src
python manage.py migrate
python initial_setup.py
cd ..
echo 'Installation Completed'
