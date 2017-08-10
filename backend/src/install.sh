rm ./content/migrations/*.py
rm ./profiles/migrations/*.py
python manage.py makemigrations
cd ..
mysql -u root -p < initial_setup.sql
cp ./easy_install_files/0002_initial_setup_profile.py ./src/profiles/migrations
cp ./easy_install_files/0002_initial_setup_content.py ./src/content/migrations
cd ./src
python manage.py migrate
echo 'Installation Completed'
