echo "Updating, upgrading and installing needed termux package..."

pkg update && pkg upgrade -y
pkg install git nodejs -y

git clone https://github.com/FaizBastomi/termux-fetish-download.git "ftd"
cd ftd

echo "Now npm will install the needed modules"

npm install
rm install.sh

echo "All done. Now type 'cd ftd' then 'npm start' "