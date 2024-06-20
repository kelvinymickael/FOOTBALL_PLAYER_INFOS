"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const containerSports = document.getElementById("container-sports");
const inputSearch = document.querySelector("#input-search input");
const buttonSearchPlayer = document.getElementById("button-search-player");
const containerPlayer = document.getElementById("container-player");
const playerImage = document.querySelector("#player-image img");
const playerCharacteristics = document.querySelectorAll("#player-characteristics span strong");
const searchTitle = document.querySelector(".search-title");
const loadingData = document.querySelector(".loading");
const playerName = document.getElementById("player-name");
const playerNumber = document.getElementById("player-number");
const playerAge = document.getElementById("player-age");
const playerTeam = document.getElementById("player-team");
function handleActiveSport() {
    containerSports.classList.toggle("active");
}
const API_URL = "https://apiv3.apifootball.com/";
const API_KEY = "7a12383b8a187e43f23ef4b4dc0157c0a0018317478883d63a92b2c47dde2426";
function fetchDataPlayer(namePlayer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}?action=get_players&player_name=${namePlayer}&APIkey=${API_KEY}`);
            const data = yield response.json();
            if (data.error === 404)
                return;
            return data;
        }
        catch (_a) {
            console.log("Some error!");
        }
    });
}
buttonSearchPlayer.addEventListener("click", () => {
    var _a;
    (_a = document.body.querySelector(".loading")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    containerPlayer.classList.add("hidden");
    fetchDataPlayer(inputSearch.value).then((data) => {
        if (inputSearch.value === "") {
            searchTitle === null || searchTitle === void 0 ? void 0 : searchTitle.classList.remove("hidden");
            loadingData === null || loadingData === void 0 ? void 0 : loadingData.classList.add("hidden");
        }
        let playerData = data;
        playerData.forEach((item) => {
            if (item.player_key) {
                searchTitle === null || searchTitle === void 0 ? void 0 : searchTitle.classList.add("hidden");
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
