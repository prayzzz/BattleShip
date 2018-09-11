﻿using System;
using Newtonsoft.Json;

namespace BattleShip.Domain
{
    public class Player
    {
        public Player(string id)
        {
            Id = id;
            Name = Guid.NewGuid().ToString();
        }

        public string Id { get; }

        [JsonIgnore]
        public Lobby Lobby { get; private set; }

        [JsonIgnore]
        public Guid GameId { get; private set; }

        public string Name { get; private set; }

        public void ChangeName(string name)
        {
            Name = name;
        }

        public void Join(Lobby lobby)
        {
            Lobby = lobby;
            Lobby.Join(this);
        }

        public void JoinGame(Guid gameId)
        {
            GameId = gameId;
        }

        public Lobby LeaveLobby()
        {
            Lobby.Leave(this);

            var l = Lobby;
            Lobby = null;
            return l;
        }
    }
}