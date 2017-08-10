mysql -u root -p < initial_setup.sql
python src/manage.py migrate
echo 'Installation Completed'
