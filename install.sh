echo "Updating, upgrading and installing needed termux package..."

pkg update && pkg upgrade -y
pkg install git nodejs -y

echo "Now npm will install the needed modules"

npm install
rm install.sh

echo "All done. Now type 'npm start' "