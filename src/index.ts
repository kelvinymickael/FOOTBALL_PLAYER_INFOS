// https://apiv3.apifootball.com/?action=get_players&player_name=Benzema&APIkey=7a12383b8a187e43f23ef4b4dc0157c0a0018317478883d63a92b2c47dde2426

interface IPlayer {
  player_image: string;
  player_name: string;
  player_number: string;
  player_age: string;
  team_name: string;
  player_key: number;
}

// Select Elements:
const containerSports = document.getElementById(
  "container-sports"
) as HTMLDivElement;
const inputSearch = document.querySelector(
  "#input-search input"
) as HTMLInputElement;
const buttonSearchPlayer = document.getElementById(
  "button-search-player"
) as HTMLButtonElement;
const containerPlayer = document.getElementById(
  "container-player"
) as HTMLDivElement;
const playerImage = document.querySelector(
  "#player-image img"
) as HTMLImageElement;
const playerCharacteristics = document.querySelectorAll(
  "#player-characteristics span strong"
);
const searchTitle = document.querySelector(".search-title");
const loadingData = document.querySelector(".loading");

const playerName = document.getElementById("player-name")!;
const playerNumber = document.getElementById("player-number")!;
const playerAge = document.getElementById("player-age")!;
const playerTeam = document.getElementById("player-team")!;

// Function to select sport:
function handleActiveSport() {
  containerSports.classList.toggle("active");
}

// Function to check if some sport is selected:


// API:
const API_URL = "https://apiv3.apifootball.com/";
const API_KEY =
  "7a12383b8a187e43f23ef4b4dc0157c0a0018317478883d63a92b2c47dde2426";

// Function to fetch data player:
async function fetchDataPlayer(namePlayer: string) {
  try {
    const response = await fetch(
      `${API_URL}?action=get_players&player_name=${namePlayer}&APIkey=${API_KEY}`
    );

    const data = await response.json();

    if (data.error === 404) return;

    return data;
  } catch {
    console.log("Some error!");
  }
}

buttonSearchPlayer.addEventListener("click", () => {
  document.body.querySelector(".loading")?.classList.remove("hidden");
  containerPlayer.classList.add("hidden");

  fetchDataPlayer(inputSearch.value).then((data) => {
    if (inputSearch.value === "") {
      searchTitle?.classList.remove("hidden");
      loadingData?.classList.add("hidden");
    }

    let playerData = data;
    playerData.forEach((item: IPlayer) => {
      if (item.player_key) {
        searchTitle?.classList.add("hidden");
        containerPlayer.classList.remove("hidden");

        if (item.player_image) {
          playerImage.src = item.player_image;
        }

        playerName.textContent = item.player_name;
        playerNumber.textContent = item.player_number;
        playerAge.textContent = item.player_age;
        playerTeam.textContent = item.team_name;
      }
    });
  });
});
