const { generateStats } = require('../../utils/scaling.js');

module.exports = {
  location: 'Lush Forest',
  enemies: {
    WildHog: {
      base: {
        name: "Wild Hog",
        level: 7,
        rarity: 'base',
        stats: generateStats(7),
        loot: [],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1355712888882593994/Boar.png?ex=67f1d684&is=67f08504&hm=df0965c1e706b121dbe1ce5640b65efbc0eee7a9f3caa7b2c09bbe9bc7803915&=&format=webp&quality=lossless&width=748&height=748"
      },
      elite: {
        name: "Rotback Tusker",
        level: 9,
        rarity: 'elite',
        stats: generateStats(9, 'elite', ['spiky']),
        loot: [],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1355712889465344112/bigHog.webp?ex=67f1d684&is=67f08504&hm=b8ffa52d663fbe5d3761f5dc440552b9eced539cb1c44b310606ae7b9fabb0bb&=&format=webp&width=748&height=748"
      },
      boss: {
        name: "Mossmaw, the Verdant Stampede",
        level: 11,
        rarity: 'boss',
        stats: generateStats(11, 'boss', ['spiky', 'diseaseAura']),
        loot: ['elderwood-plate'],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1355712888312037446/boarBoss.webp?ex=67f1d684&is=67f08504&hm=295b5e3c2ddbff4daa6d9790d11f1b90c9b358df0ff60c45e5ff1e9e88825066&=&format=webp&width=748&height=748"
      }
    },

    Fernfang : {
      base: {
        name: "Fernfang",
        level: 5,
        rarity: 'base',
        stats: generateStats(5),
        loot: [],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1355840464963637288/ChatGPT_Image_Mar_29_2025_11_08_18_PM.png?ex=67ea6455&is=67e912d5&hm=78e5af86ed002ec749e2e87a6fe95f72d553d79484a848334b415e200802f99c&=&format=webp&quality=lossless&width=747&height=747"
      },
      elite: {
        name: "Frondveil Strangler",
        level: 7,
        rarity: 'elite',
        stats: generateStats(7, 'elite', ['camouflage']),
        loot: ["Venom Gland", "Thorned Scales"],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1355840466096099358/ChatGPT_Image_Mar_29_2025_11_21_09_PM.png?ex=67ea6455&is=67e912d5&hm=824c673de0adb35d270be5a145eb9204aeca053483f6146009ffd4597eec9d02&=&format=webp&quality=lossless&width=747&height=747"
      },
      boss: {
        name: "Selvothis, the Verdant Coil",
        level: 9,
        rarity: 'boss',
        stats: generateStats(9, 'boss', ['poisonedSpit', 'toxicCloud']),
        loot: ['sylvan-crown'],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1355840465693310997/ChatGPT_Image_Mar_30_2025_01_49_19_AM.png?ex=67ea6455&is=67e912d5&hm=577a4e0532b4376df3df0fdbea3c5e7ec2387d2c1a3fea7c52fd5daa0b88dd6f&=&format=webp&quality=lossless&width=747&height=747"
      }
    },

    Barkbiter: {
      base: {
        name: "Barkbiter",
        level: 1,
        rarity: 'base',
        stats: generateStats(1),
        loot: [],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1357920930294141070/ChatGPT_Image_Apr_3_2025_09_56_25_PM.png?ex=67f1f5ea&is=67f0a46a&hm=98d5878fea6b402da2493c5ddfd87c0b6b24b9fde9cc4d06f8a0afa9e10e1168&=&format=webp&quality=lossless&width=748&height=748"
      },
      elite: {
        name: "Sapdrinker",
        level: 3,
        rarity: 'elite',
        stats: generateStats(3, 'elite', ['woodArmor']),
        loot: [],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1357920931410084021/ChatGPT_Image_Apr_3_2025_09_55_54_PM.png?ex=67f1f5ea&is=67f0a46a&hm=cb4f7fabff2977a529a966e8afeafabe7656b3209e46416f29402da8f27b9ab5&=&format=webp&quality=lossless&width=748&height=748"
      },
      boss: {
        name: "Sapmonger, the Verdant Guardian",
        level: 5,
        rarity: 'boss',
        stats: generateStats(5, 'boss', ['woodArmor', 'biteFrenzy']),
        loot: ['wyrmwood-greatsword'],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1357920930826944512/ChatGPT_Image_Apr_3_2025_09_56_20_PM.png?ex=67f1f5ea&is=67f0a46a&hm=00f049bb4bbc8f7216fe9d782c9947e90ba60967b41b28bf0fa7d3612e3e41a8&=&format=webp&quality=lossless&width=748&height=748"
      }
    },

    Thornscratcher: {
      base: {
        name: "Thornscratcher",
        level: 3,
        rarity: 'base',
        stats: generateStats(3),
        loot: [],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1357920927785947166/ChatGPT_Image_Apr_3_2025_10_05_47_PM.png?ex=67f1f5ea&is=67f0a46a&hm=ac6951b358b3719897cf7bf292bba29540392a269894ba35cbc31890ec48ce8f&=&format=webp&quality=lossless&width=748&height=748"
      },
      elite: {
        name: "Venomthorn Warden",
        level: 5,
        rarity: 'elite',
        stats: generateStats(5, 'elite', ['piercingCry']),
        loot: [],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1357920928398311435/ChatGPT_Image_Apr_3_2025_10_05_42_PM.png?ex=67f1f5ea&is=67f0a46a&hm=ce56de50fc0245e417c78e0a170140f3ada3133a72c39ffb3a70cdb0091a41d2&=&format=webp&quality=lossless&width=748&height=748"
      },
      boss: {
        name: "Feralthorn, the Verdant King",
        level: 7,
        rarity: 'boss',
        stats: generateStats(7, 'boss', ['piercingCry', 'poisonBarbs']),
        loot: ['thornmantle-leggings'],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1355712886453833870/thornyboy.png?ex=67f1d684&is=67f08504&hm=d49d8492e66511f7ec8dacbcf2bb33696dff760537764864cec2ee59eed151e5&=&format=webp&quality=lossless&width=748&height=748"
      }
    },

    ForestSlime: {
      base: {
        name: "Forest Slime",
        level: 9,
        rarity: 'base',
        stats: generateStats(9),
        loot: [],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1355717968851370215/DALLE_2025-03-29_18.33.20_-_A_sentient-looking_forest_slime_creature_in_a_lush_vibrant_forest_environment._The_slime_is_semi-transparent_and_green_with_glowing_spores_bark_an.webp?ex=67f1db3f&is=67f089bf&hm=ddf0008c05e0c99cb6079294d5f5776acddafe3bab62a943eea1b3838d5ee1aa&=&format=webp&width=748&height=748"
      },
      elite: {
        name: "Gloombulb",
        level: 11,
        rarity: 'elite',
        stats: generateStats(11, 'elite', ['toughHide']),
        loot: [],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1357920932068327575/ChatGPT_Image_Apr_4_2025_08_33_30_PM.png?ex=67f1f5eb&is=67f0a46b&hm=a8bf0f8496336ed2bfad11bd736df382ef62192ad25c1ff27955adb2eda2547b&=&format=webp&quality=lossless&width=748&height=748"
      },
      boss: {
        name: "Bloomrot, the Verdant Blight",
        level: 13,
        rarity: 'boss',
        stats: generateStats(13, 'boss', ['toughHide', 'maulRush']),
        loot: ['foreststride-boots'],
        image: "https://media.discordapp.net/attachments/1355442332186574961/1355717966892630157/DALLE_2025-03-29_18.33.54_-_A_massive_sentient_forest_slime_boss_creature_in_a_lush_magical_forest._Its_gelatinous_body_is_towering_and_semi-transparent_glowing_from_within_wi.webp?ex=67f1db3f&is=67f089bf&hm=c5e02ad0e60ae062326077d7573314d99c94636fc25826399faa41f2454c4f66&=&format=webp&width=748&height=748"
      }
    }
  }
};
