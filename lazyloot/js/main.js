var items = {
    "common": [
        {"id": 0001,
        "name": "Power Monkey",
        "description": "No more manual monkeys! Now you have a Power Monkey!"},
        {"id": 0002,
        "name": "Full Onion",
        "description": "The onion is half full. Or whole full... or awefull."},
        {"id": 0003,
        "name": "Big Nugget",
        "description": "Use the Big Nugget to make everyone jealous."},
        {"id": 0004,
        "name": "Dopplar Radar",
        "description": "Beep... Beep... Beep... Beeeeeeeeeep."},
        {"id": 0005,
        "name": "That One Guy",
        "description": "You know, he does that thing?"},
        {"id": 0006,
        "name": "That Other Guy",
        "description": "Oh! Yeah I remember That Other Guy!"},
        {"id": 0007,
        "name": "Sand Pay-peer",
        "description": "I am pretty sure you mispronounced 'paper'."},
        {"id": 0008,
        "name": "Running Water",
        "description": "Sploosh!"},
        {"id": 0009,
        "name": "A Good Thyme",
        "description": "But just one. Don't get greedy."},
        {"id": 0010,
        "name": "70's Pantsuit",
        "description": "You're ready for the big time now!"},
        {"id": 0010,
        "name": "Tattoo of a Parrot",
        "description": "It doesn't talk. What a ripoff."},
        {"id": 0010,
        "name": "New Faucett",
        "description": "I can feel it running through me."},
        {"id": 0010,
        "name": "Conga Line",
        "description": "But on a card. Not as fun?"},
        {"id": 0010,
        "name": "Slightly Used Jumprope",
        "description": "It's in near pristine condition. "},
        {"id": 0010,
        "name": "Caveman",
        "description": "Sophisticated, yet smelly."}
    ],
    "magic": [ 
        {"id": 0011,
        "name": "Magic Bullet",
        "description": "It does the trick. EVERY TIME."},
        {"id": 0010,
        "name": "Rapier of Wit",
        "description": "Brain weapons are the best."},
        {"id": 0010,
        "name": "Punching Gloves of Softness",
        "description": "Comfort to die for."},
        {"id": 0010,
        "name": "Bag",
        "description": "No."},
        {"id": 0010,
        "name": "Fingernails of Scab Picking",
        "description": "Perfect for causing infection if there are no bandaids available."},
        {"id": 0010,
        "name": "Band-Aids",
        "description": "Stops all pain and bleeding immediately."}, 
        {"id": 0025, 
        "name": "Digital Assertion", 
        "description": "AssertAssert digitallydigitally "}
    ],
    "rare": [
        {"id": 0012,
        "name": "Super Rare Steak",
        "description": "Hope you like it bloody."},
        {"id": 0010,
        "name": "C-4 Explosives",
        "description": "Time to mess some stuff up. But from a distance."},
        {"id": 0010,
        "name": "Bastard Sword of Sharpness",
        "description": "Never gets dull. Great at parties."},
        {"id": 0010,
        "name": "Varicose Armor of Bulgeyness",
        "description": "You can see it throb with power."},
    ],
    "unique": [
        {"id": 0013,
        "name": "Unique Cat",
        "description": "How do you catch a unique cat? Unique up on it."},
        {"id": 0010,
        "name": "The Pig Sticker",
        "description": "Big, sharp, and great for guting your enemies that you want to cook and eat."},
        {"id": 0010,
        "name": "Dogan's Embellishment",
        "description": "A giant sword that's bigger when you talk about it later."},
        {"id": 0010,
        "name": "Golden Shinju Blade",
        "description": "Cuts through literally anything. Especially BS."}
    ]
}

var inventory = [];
var chests = 0;
var maxChests = 10;
var chestInterval = 10; // seconds
var opening = false;
var earning = true;

var openedMessage = 'Chest Opened!';
var maxChestAlert = 'You can\'t earn any more chests. Jeez.';

$(document).ready(function() {
    
    refreshInventory();
    $('#open').hide();
    
    $('.help-btn').click(function() {
        var myText = $('.help-btn').text();
        
        if (myText == 'Show Help')
            $('.help-btn').text('Hide Help');
        else
            $('.help-btn').text('Show Help');
        $('.help-text').toggle();
    });
    
    $()
    
    
    startEarningChests();
    
    var countdown = chestInterval;
    $('.next-chest span').text(countdown);
    

    $('#open').click(function() {
        opening = true;
        chests --;
        $('.max-chest-alert').text('');
        $('.num-chests span').text(chests);
        var openMe = $(this);
        openMe.hide();
        $('.open-message').text('Opening...');
        
        setTimeout(function(){ 
            opening = false;
            $('.open-message').text(openedMessage);
            
            
            var rarity = getRarity();
            
            var myItem = items[rarity][Math.floor(Math.random() * items[rarity].length)];
            
            $('.reward .item-name').text(myItem.name);
            $('.reward .item-description').text(myItem.description);
            //myItem.rarity = 
            
            $('.open-options').html('<button class="add-to-inventory">Add to Inventory</button>');
            
            
            $('.add-to-inventory').click(function() {
                myItem.rarity = rarity;
                inventory.push(myItem);
                
                $('.reward .item-name').text('');
                $('.reward .item-description').text('');
                $('.open-message').text('');
                
                $(this).remove();
                refreshInventory();
            });
            
            if(chests > 0) {
                openMe.show();
            }
            
        }, 1000);
        
        
        if(!earning) startEarningChests();
        
    });
    
    function earnChest(interval) {
        countdown --;
        
        $('.next-chest span').text(countdown);
        if(countdown == 0) {
            
            if (chests < maxChests) {
                chests ++;
                $('.num-chests span').text(chests);
                if(!opening);
                $('#open').show();
                countdown = chestInterval;
                if (chests == maxChests) {
                    $('.max-chest-alert').text(maxChestAlert);
                    $('.next-chest').hide();
                    clearInterval(interval);
                    earning = false;
                }
            }
        }
        
    $('.next-chest span').text(countdown);
    }
    
    function startEarningChests() {
        earning = true;
        $('.max-chest-alert').text('');
        $('.next-chest').show();
        var chestTimer = setInterval(function() {
            earnChest(chestTimer);
        }, 1000);
    }
    
    function refreshInventory() {
        output = '';
        for (var i in inventory) {
            output += '<li class="item item-' + inventory[i].rarity + '">';
            output += '<div class="item-name">' + inventory[i].name + '</div>';
            output += '<div class="item-description">' + inventory[i].description + '</div>';
            output += '</li>';
        }
        $('.item-container').html(output);
    }
});


function getRarity() {
    var rarity = Math.floor(Math.random() * 100);
    if (rarity > 0 && rarity < 70) rarity = "common";
    if (rarity >= 70 && rarity < 90) rarity = "magic";
    if (rarity >= 90 && rarity < 99) rarity = "rare";
    if(rarity >= 99) rarity = "unique";

    return rarity;

}