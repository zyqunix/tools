var background_color = "#fafafa";
var canvas = document.getElementById("canvas");
var renderer = new THREE.WebGLRenderer( { canvas: canvas } );
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var win_width = 0, win_height = 0;
function update_size() {
    if (window.innerWidth != win_width || window.innerHeight != win_height) {
        win_width = window.innerWidth;
        win_height = window.innerHeight;
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.setSize(win_width, win_height);
        camera.aspect = win_width / win_height;
        camera.updateProjectionMatrix();
    }
}
update_size();

var clock = new THREE.Clock();
var delta_time = 1/60.0;
var elapsed_time = 0;

var geometry = new THREE.Geometry();
var radius = 10;
var depth_step = 10;
var num_rings = 100;
var num_segments = 24;

var outer_h = Math.max($("#outer").height(), 10000) - 1200;
var content_h = Math.max($("#content").height(), 10000);
var content_h2 = $("#content").height() + 9200;

var base_colors = [];
var colors = [];
var num_colors = num_rings * num_segments * 2;
for (var c = 0; c < num_colors; c++) {
    base_colors[c] = new THREE.Color(Math.random(), Math.random(), Math.random());
    colors[c] = base_colors[c].clone();
}

function lerp(res, color1, color2, t) {
    res.r = (1-t)*color1.r + t*color2.r;
    res.g = (1-t)*color1.g + t*color2.g;
    res.b = (1-t)*color1.b + t*color2.b;
}

function update_colors(delta, progress) {
    var bias = 1;
    var bg = new THREE.Color(background_color);
    var h1 = content_h - 6000;
    var h2 = content_h + 400;
    if (progress < h1) {
        bias = 0;
    } else if (progress < h2) {
        bias = (progress - h1) / (h2 - h1);
    }
    //if (s > content_h) {
    //    if (s > content_h + 1000) {
    //        color = new THREE.Color(1, 1, 1);
    //    } else {
    //        var q = (s - content_h) / 1000;
    //        //color = new THREE.Color(r + (1-r) * q, g + (1-g) * q, b + (1-b) * q);
    //        color = new THREE.Color();
    //        color.setHSL(0, 0.5, q * 0.6 + 0.4);
    //    }
    //} else {
    //    var q = (content_h-s) / content_h;
    //    color = new THREE.Color();
    //    color.setHSL(q, 0.5, 0.4);
    //}
    for (var c = 0; c < num_colors; c++) {
        var hsl = base_colors[c].getHSL();
        var h = hsl.h;
        h = (h + delta * (1+c/100)) % 1;
        base_colors[c].setHSL(h, hsl.s, hsl.l);
        lerp(colors[c], bg, base_colors[c], bias);
    }
}
update_colors(0, 0);

var verts = [];
var speeds = [];
var phases = [];
function init_verts() {
    var x = 0, y = 0, z = 0;
    var dz = -depth_step / num_segments;
    for (var r = 0; r < num_rings; r++) {
        for (var s = 0; s < num_segments; s++) {
            var angle = Math.PI * 2 * (s / num_segments);
            var x = Math.cos(angle) * radius;
            var y = Math.sin(angle) * radius;
            verts.push(new THREE.Vector3(x, y, z));
            speeds.push(Math.random());
            phases.push(Math.random());
            z += dz;
        }
    }
}
init_verts();
function update_verts(t) {
    var d = num_rings * 0.4;
    var v = 0;
    for (var r = 0; r < num_rings; r++) {
        for (var s = 0; s < num_segments; s++) {
            if (r > d) {
                var p = 0.5 + 0.5 * Math.sin(t*speeds[v] + phases[v])
                var q = (r-d)/d * 1.1;
                var rad = (1-p * q) * radius;
                var angle = Math.PI * 2 * (s / num_segments);
                var x = Math.cos(angle) * rad;
                var y = Math.sin(angle) * rad;
                var vert = verts[v];
                vert.x = x;
                vert.y = y;
            }
            v++;
        }
    }
}
update_verts(0);

function mkgeometry(geometry) {
    var fi = 0;
    var f = 0;
    var vi = 0;
    var v = 0;
    var x = 0, y = 0, z = 0;
    var dz = -depth_step / num_segments;
    var c = 0;
    for (var r = 0; r < num_rings; r++) {
        for (var s = 0; s < num_segments; s++) {
            var vert1 = verts[vi];
            var vert2 = vi - 1 >= 0 ? verts[vi - 1] : verts[0];
            var vert3 = vi - num_segments >= 0 ? verts[vi - num_segments] : verts[0];
            var vert4 = vi - num_segments - 1 >= 0 ? verts[vi - num_segments - 1] : verts[0];
            vi++;
            
            geometry.vertices[v++] = vert1;
            geometry.vertices[v++] = vert2;
            geometry.vertices[v++] = vert4;
            geometry.faces[f++] = new THREE.Face3(fi, fi+1, fi+2, null, colors[c++]);
            fi += 3;
            geometry.vertices[v++] = vert1;
            geometry.vertices[v++] = vert4;
            geometry.vertices[v++] = vert3;
            geometry.faces[f++] = new THREE.Face3(fi, fi+1, fi+2, null, colors[c++]);
            fi += 3;
            old_x = x;
            old_y = y;
            old_z = z;
            z += dz;
        }
    }
    geometry.verticesNeedUpdate = true;
    geometry.colorsNeedUpdate = true;
    geometry.elementsNeedUpdate = true;
}
mkgeometry(geometry);
var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors, color: background_color });
material.depthFunc = THREE.AlwaysDepth;
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

var s = 0;
var total_s = 0;
var first_time = true;
var animate = function () {
    //console.log("updating background");
    update_size();
    delta_time = clock.getDelta();
    elapsed_time = clock.elapsedTime;

    var win = $(window);
    var prev_s = s;
    s = $(window).scrollTop();
    var ds = Math.abs(s - prev_s);
    camera.position.z = -s/outer_h*(num_rings * depth_step);
    //var color;
    //color = new THREE.Color("#efefef");
    //if (s > content_h) {
    //    if (s > content_h + 1000) {
    //        color = new THREE.Color(1, 1, 1);
    //    } else {
    //        var q = (s - content_h) / 1000;
    //        //color = new THREE.Color(r + (1-r) * q, g + (1-g) * q, b + (1-b) * q);
    //        color = new THREE.Color();
    //        color.setHSL(0, 0.5, q * 0.6 + 0.4);
    //    }
    //} else {
    //    var q = (content_h-s) / content_h;
    //    color = new THREE.Color();
    //    color.setHSL(q, 0.5, 0.4);
    //}
    //material.color = color;
    if (ds > 0 || first_time) {
        total_s += ds * 0.01;
        update_colors(ds * 0.00001, s);
        update_verts(total_s);
        mkgeometry(mesh.geometry);
        first_time = false;
    }
    renderer.render(scene, camera);
    requestAnimationFrame( animate );
};
animate();
//setInterval(animate, 500); // backup as sometimes requestAnimationFrame doesn't trigger in Firefox
