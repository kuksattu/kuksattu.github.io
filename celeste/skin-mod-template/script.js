var filePathDefinitions = {
    "both":[
        "everest.yaml",
        "SkinModHelperConfig.yaml",
        "Dialog/English.txt",
        "Graphics/Sprites.xml",
        "Graphics/{YourName}/{YourSkin}/Sprites.xml",
        "Graphics/{YourName}/{YourSkin}_no_backpack/Sprites.xml",
        "Graphics/Atlases/Gameplay/characters/{YourName}/{YourSkin}/skinConfig/CharacterConfig.yaml",
        "Graphics/Atlases/Gameplay/characters/{YourName}/{YourSkin}_no_backpack/skinConfig/CharacterConfig.yaml",
        "Graphics/Atlases/Gameplay/characters/{YourName}/{YourSkin}/skinConfig/HairConfig.yaml",
        "Graphics/Atlases/Gameplay/characters/{YourName}/{YourSkin}_no_backpack/skinConfig/HairConfig.yaml",
    ],
    "no_backpack_only":[
        "everest.yaml",
        "SkinModHelperConfig.yaml",
        "Dialog/English.txt",
        "Graphics/Sprites.xml",
        "Graphics/{YourName}/{YourSkin}/Sprites.xml",
        "Graphics/Atlases/Gameplay/characters/{YourName}/{YourSkin}/skinConfig/CharacterConfig.yaml",
        "Graphics/Atlases/Gameplay/characters/{YourName}/{YourSkin}/skinConfig/HairConfig.yaml",
    ],
    "backpack_only":[
        "everest.yaml",
        "SkinModHelperConfig.yaml",
        "Dialog/English.txt",
        "Graphics/Sprites.xml",
        "Graphics/{YourName}/{YourSkin}/Sprites.xml",
        "Graphics/Atlases/Gameplay/characters/{YourName}/{YourSkin}/skinConfig/CharacterConfig.yaml",
        "Graphics/Atlases/Gameplay/characters/{YourName}/{YourSkin}/skinConfig/HairConfig.yaml",
    ],
    "reduced_spritecount":[
        "everest.yaml",
        "SkinModHelperConfig.yaml",
        "Dialog/English.txt",
        "Graphics/Sprites.xml",
        "Graphics/{YourName}/{YourSkin}/Sprites.xml",
        "Graphics/Atlases/Gameplay/characters/{YourName}/{YourSkin}/skinConfig/HairConfig.yaml",
    ]
}

async function download(templateName, substitutions) {

    substitutionDefinitions = substitutions;

    var zip = await fetch("templates/" + templateName + ".zip")
        .then(response => {
            if (response.status === 200 || response.status === 0) {
                return Promise.resolve(response.blob());
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        })
        .then(JSZip.loadAsync);

    await changeFileContents(zip, templateName);

    renameFolders(zip);

    zip.generateAsync({ type: "blob" })
        .then(function (blob) {
            save(blob);
        });
}

async function changeFileContents(zip, templateName) {    
    var pathList = filePathDefinitions[templateName];
    for (var path of pathList) {
        var text = await zip.file(path).async("string");
        var newText = applySubstitutions(text);
        zip.file(path, newText);
    }
}

function renameFolders(zip) {
    const renamedZip = new JSZip();
    
    for (const [key, file] of Object.entries(zip.files)) {
        var newName = applySubstitutions(file.name);
        renamedZip.files[newName] = file;
    }
    zip.files = renamedZip.files;
}

function save(blob) {
    a = document.createElement('a');
    var name = substitutionDefinitions["{YourName}"];
    var character = substitutionDefinitions["{YourSkin}"];
    a.download = character + "_Skinmod_" + name;
    a.href = window.URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function applySubstitutions(inputString){
    for (const [pattern, replacement] of Object.entries(substitutionDefinitions)) {
        inputString = inputString.replaceAll(pattern, replacement);
    }
    return inputString;
}