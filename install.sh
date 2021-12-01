# Install Script
GRN='\033[0;32m'
CY='\033[0;36m'
NC='\033[0m'

echo "Updating, upgrading and installing needed termux package..."

pkg update -y
pkg install git nodejs -y
clear

echo -e "${GRN}Cloning ${CY}termux-fetish-download${GRN}...${NC}"
git clone https://github.com/FaizBastomi/termux-fetish-download.git "ftd" --depth 1 --quiet
cd ftd

echo -e "${GRN}Now npm will install the needed modules${NC}"
npm install --silent
rm install.sh

echo -e "${GRN}All done. Now type ${CY}'cd ftd'${GRN} then ${CY}'npm start'${NC}"
