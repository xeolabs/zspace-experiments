/**

 A simple renderer that calls just enough WebGL functions to draw a triangle.

 Usage:

 var renderer = new Renderer(canvas, gl);
 renderer.draw(viewMat, projMat);

 */
var Renderer = function (canvas, gl) {

    // init shaders

    var vertShaderSource = [
        "attribute vec3 aVertexPosition;",
        "uniform mat4 viewMat;",
        "uniform mat4 projMat;",
        "void main(void) {",
        "   gl_Position = projMat * viewMat * vec4(aVertexPosition, 1.0);",
        "}"
    ].join("\n");

    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertShaderSource);
    gl.compileShader(vertShader);
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(vertShader));
        return;
    }

    var fragShaderSource = [
        "precision highp float;",
        "void main(void) {",
        "   gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);",
        "}"
    ].join("\n");

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragShaderSource);
    gl.compileShader(fragShader);
    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(fragShader));
        return;
    }

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);

    var projMatUniform = gl.getUniformLocation(shaderProgram, "projMat");
    var viewMatUniform = gl.getUniformLocation(shaderProgram, "viewMat");

    // Set initial matrix uniform values
    gl.uniformMatrix4fv(viewMatUniform, false, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    gl.uniformMatrix4fv(projMatUniform, false, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

    // Init geometry
    var vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    var vertices = [
        0.0, 0.9, 0.0,
        -0.9, -0.9, 0.0,
        0.9, -0.9, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = 3;
    vertexPositionBuffer.numItems = 3;

    /**
     * Draws a frame.
     */
    this.draw = function (viewMat, projMat) {
        gl.uniformMatrix4fv(viewMatUniform, false, viewMat);
        gl.uniformMatrix4fv(projMatUniform, false, projMat);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
        gl.vertexAttribPointer(vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, vertexPositionBuffer.numItems);
    };
};