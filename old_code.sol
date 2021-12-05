    // function getPlanetOne(uint256 tokenId) public view returns (string memory) {
    //     return getPlanet(tokenId, "PLANET ONE", worlds, rareWorlds);
    // }

    // function getPlanetTwo(uint256 tokenId) public view returns (string memory) {
    //     return getPlanet(tokenId, "PLANET TWO", worlds, rareWorlds);
    // }

    // function getPlanetThree(uint256 tokenId)
    //     public
    //     view
    //     returns (string memory)
    // {
    //     return getPlanet(tokenId, "PLANET THREE", worlds, rareWorlds);
    // }

    // function getPlanetFour(uint256 tokenId)
    //     public
    //     view
    //     returns (string memory)
    // {
    //     return getPlanet(tokenId, "PLANET FOUR", worlds, rareWorlds);
    // }

    // function getPlanetFive(uint256 tokenId)
    //     public
    //     view
    //     returns (string memory)
    // {
    //     return getPlanet(tokenId, "PLANET FIVE", worlds, rareWorlds);
    // }

    // function getPlanetSix(uint256 tokenId) public view returns (string memory) {
    //     return getPlanet(tokenId, "PLANET SIX", worlds, rareWorlds);
    // }

    // function getPlanetSeven(uint256 tokenId)
    //     public
    //     view
    //     returns (string memory)
    // {
    //     return getPlanet(tokenId, "PLANET SEVEN", worlds, rareWorlds);
    // }

    // function getPlanetEight(uint256 tokenId)
    //     public
    //     view
    //     returns (string memory)
    // {
    //     return getPlanet(tokenId, "PLANET EIGHT", worlds, rareWorlds);
    // }

    // function getPlanetNine(uint256 tokenId)
    //     public
    //     view
    //     returns (string memory)
    // {
    //     return getPlanet(tokenId, "PLANET NINE", worlds, rareWorlds);
    // }

    // function getPlanet(
    //     uint256 tokenId,
    //     string memory keyPrefix,
    //     string[] memory sourceArray,
    //     string[] memory rareSourceArray
    // ) public pure returns (string memory) {
    //     uint256 rand = random(
    //         string(abi.encodePacked(keyPrefix, toString(tokenId)))
    //     );
    //     string memory planet = sourceArray[rand % sourceArray.length];
    //     if (keccak256(bytes(planet)) == keccak256(bytes(keyPrefix))) {
    //         uint256 randForRare = random(
    //             string(abi.encodePacked("RARE ONE", toString(tokenId)))
    //         );
    //         planet = rareSourceArray[randForRare % rareSourceArray.length];
    //     }
    //     return planet;
    // }
