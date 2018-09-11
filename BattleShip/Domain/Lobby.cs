﻿using System;
using System.Collections.Generic;

namespace BattleShip.Domain
{
    public class Lobby
    {
        private readonly List<Player> _players;

        public Lobby() : this(Guid.NewGuid())
        {
        }

        protected Lobby(Guid id)
        {
            Id = id;

            _players = new List<Player>();
        }

        public Guid Id { get; }

        public string IdStr => Id.ToString();

        public IEnumerable<Player> Players => _players;

        public bool IsEmpty => _players.Count == 0;

        public void Join(Player player)
        {
            _players.Add(player);
        }

        public void Leave(Player player)
        {
            _players.Remove(player);
        }
    }
}