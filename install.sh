echo "Updating, upgrading and installing needed termux package..."

pkg update && pkg upgrade -y
pkg install git nodejs -y

git clone https://github.com/FaizBastomi/termux-fetish-download.git
cd termux-fetish-download

echo "Now npm will install the needed modules"

npm install
rm install.sh

echo "All done. Now type 'cd termux-fetish-download' then 'npm start' "