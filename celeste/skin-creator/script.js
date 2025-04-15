Coloris({
    alpha: false
});

document.addEventListener("DOMContentLoaded", function() {
    
    const gridItems = document.querySelectorAll('.grid-item');
    // Add click event to each grid item
    gridItems.forEach(item => {
        if(item.id == "outline" || item.id == "hair1" || item.id == "hair2" || item.id == "") return;
      
        const elementID = item.id;
       
       
        if (false) {
            item.addEventListener('click', () => {
                 item.id = item.id == "legs1" ? "legs2" : "legs1";
            });
            return;
        }

        item.addEventListener('click', () => {

            // Create color input element
            const colorPicker = document.createElement('input');
            colorPicker.type = 'text';
            colorPicker.setAttribute("data-coloris", true);
            colorPicker.style.position = 'absolute';
            colorPicker.style.opacity = '0';
            colorPicker.style.transform = 'translateX(-500px)';
            
            let celColor = rgbToHex(window.getComputedStyle(item, null).backgroundColor);
            
            colorPicker.value = celColor;
            document.body.appendChild(colorPicker);
            
            // Simulate click on the color picker
            colorPicker.click();
            document.body.removeChild(colorPicker);
            
            // Change the background color of the grid item
            colorPicker.addEventListener('input', (event) => {
                newColor = event.target.value;
                setVar(elementID, newColor);

                // sameIDElements = document.querySelectorAll("#"+elementID);
                // sameIDElements.forEach(element => {
                //     element.style.backgroundColor = newColor;
                //     if(newColor == "#ffffff") element.style.removeProperty('background-color')
                // });
            });
        });


        item.addEventListener('mouseover', () => {
            sameIDElements = document.querySelectorAll("#"+elementID);
            sameIDElements.forEach(element => {
                // element.style.scale = "1.4";
                // element.style.zIndex = "1000";
                // element.style.borderRadius = "4px"
                element.style.opacity = "0.4";
        
            });
        });


        item.addEventListener('mouseout', () => {
            sameIDElements = document.querySelectorAll("#"+elementID);
            sameIDElements.forEach(element => {
                // element.style.scale = "1";
                // element.style.zIndex = "0";
                // element.style.borderRadius = "0"
                element.style.opacity = "1";
            });
        });

    });
});



function randomizeSkin(){
    const root = document.querySelector(':root');
    const genRanHex = size => "#"+[...Array(size)].map(() => Math.floor(Math.random() * 13).toString(16)).join('');
    const gridItems = document.querySelectorAll('.grid-item');
    console.log(genRanHex(6));
    root.style.setProperty('--arms', genRanHex(6))
    root.style.setProperty('--shirt1', genRanHex(6))
    root.style.setProperty('--waist1', genRanHex(6))
    root.style.setProperty('--waist2', genRanHex(6))
    root.style.setProperty('--legstip', genRanHex(6))
    root.style.setProperty('--legs1', genRanHex(6))
    root.style.setProperty('--legs2', genRanHex(6))
    root.style.setProperty('--legslower', genRanHex(6))
    root.style.setProperty('--neckpadding', genRanHex(6))
}

function copyToClipboard(){
    navigator.clipboard.writeText(`
        {"arms":"${getVar("arms")}",
        "shirt1":"${getVar("shirt1")}",
        "waist1":"${getVar("waist1")}",
        "waist2":"${getVar("waist2")}",
        "legstip":"${getVar("legstip")}",
        "legslower":"${getVar("legslower")}",
        "legs1":"${getVar("legs1")}",
        "legs2":"${getVar("legs2")}",
        "neckpadding":"${getVar("neckpadding")}",
        "hand1":"${getVar("hand1")}",
        "hand2":"${getVar("hand2")}",
        "head1":"${getVar("head1")}",
        "head2":"${getVar("head2")}",
        "hair":"${getVar("hair1")}"
        }`);
    alert("Copied to Clipboard");
}

function getVar(name) {
    const root = document.querySelector(':root');
    let rootStyle = getComputedStyle(root);
    return rootStyle.getPropertyValue(`--${name}`)
}

function setVar(name, value) {
    const root = document.querySelector(':root');
    root.style.setProperty(`--${name}`, value);
}

function rgbToHex(col)
{
    if(col.charAt(0)=='r')
    {
        col=col.replace('rgb(','').replace(')','').split(',');
        var r=parseInt(col[0], 10).toString(16);
        var g=parseInt(col[1], 10).toString(16);
        var b=parseInt(col[2], 10).toString(16);
        r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
        var colHex='#'+r+g+b;
        return colHex;
    }
}