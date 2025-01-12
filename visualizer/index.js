let blockCount = 0; 

function createScene(engine, canvas, length, width, height, margin) {
    const scene = new BABYLON.Scene(engine);

    
    const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    
    const light = new BABYLON.HemisphericLight("light1", BABYLON.Vector3.Up(), scene);
    light.intensity = 0.7;

    
    const blockSize = 1;
    

    
    scene.meshes.forEach(mesh => {
        if (mesh.name === 'block' || mesh.name === 'borderBlock') {
            mesh.dispose();
        }
    });

    blockCount = 0;
    

    
    for (let x = 0; x < length; x++) {
        for (let y = 0; y < width; y++) {
            for (let z = 0; z < height; z++) {
                if (x === 0 || x === length - 1 || y === 0 || y === width - 1 || z === 0 || z === height - 1) {
                    createBlock(scene, x * (blockSize + margin), y * (blockSize + margin), z * (blockSize + margin), blockSize);
                    blockCount++; 
                }
            }
        }
    }

    
    const countText = new BABYLON.GUI.TextBlock();
    countText.text = "Blocks: " + blockCount; 
    countText.color = "white";
    countText.fontSize = 24;
    countText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    countText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
    advancedTexture.addControl(countText); 

    return scene;
}

function createBlock(scene, x, y, z, size) {
    const block = BABYLON.MeshBuilder.CreateBox("block", {
        size: size
    }, scene);
    block.position = new BABYLON.Vector3(x, y, z);

    
    const blockMaterial = new BABYLON.StandardMaterial("blockMaterial", scene);
    blockMaterial.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.7); 
    block.material = blockMaterial;

    
    const borderMaterial = new BABYLON.StandardMaterial("borderMaterial", scene);
    borderMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
    

    
    const borderBlock = BABYLON.MeshBuilder.CreateBox("borderBlock", {
        size: size + 0.1
    }, scene);
    borderBlock.position = new BABYLON.Vector3(x, y, z);
    borderBlock.material = borderMaterial;
}

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    let length = parseInt(document.getElementById("length").value);
    let width = parseInt(document.getElementById("width").value);
    let height = parseInt(document.getElementById("height").value);
    let margin = parseFloat(document.getElementById("margin").value);

    const scene = createScene(engine, canvas, length, width, height, margin);

    
    document.getElementById("updateScene").addEventListener("click", () => {
        length = parseInt(document.getElementById("length").value);
        width = parseInt(document.getElementById("width").value);
        height = parseInt(document.getElementById("height").value);
        margin = parseFloat(document.getElementById("margin").value);
        createScene(engine, canvas, length, width, height, margin); 
    });

    
    engine.runRenderLoop(() => {
        scene.render();
    });

    
    window.addEventListener("resize", () => {
        engine.resize();
    });
});
