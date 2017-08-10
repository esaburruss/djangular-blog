mysql -u root -p < ../initial_setup.sql
rm ./content/migrations/*.py
rm ./profiles/migrations/*.py
python manage.py makemigrations profiles
python manage.py makemigrations content
cp ../easy_install_files/0002_initial_setup_profile.py ./profiles/migrations
cp ../easy_install_files/0002_initial_setup_content.py ./content/migrations
python manage.py migrate
echo 'Installation Completed'
