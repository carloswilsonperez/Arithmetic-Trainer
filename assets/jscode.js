/**
 * ############ sumas.html ###########################
 * Created by Carlos Alberto Wilson Pérez on 7/02/14.
 * ###################################################
 */

//Declaración de variables globales.
var screenWidth, screenHeight;
var numOperations, numDigits, operatorSymbol;
var myCanvas = document.getElementById("myCanvas");
var paper;
var stageObject;
var myCover;
var circles = [];
var circleLabels = [];
var leftLabels = [];
var startButton;
var labelStartButton;
var startButtonSet;
var navBarCircles = [];
var backButtonSet;
var forwardButtonSet;
var myOperation = {};
var homeButton;
var homeIcon;
var homeButtonSet;
var backgroundCanvas;
var digits = [];
var resultDigits = [];
var wrongDigit;
var myMark;
var myCursor;
var cursorOn = true;
var cursorHandler;

var back = document.getElementById("back");
var forward = document.getElementById("forward");
var home = document.getElementById("home");

var exerciseDivs = document.getElementsByClassName("exercise");
var digitsDivs = document.getElementsByClassName("digits");
var operatorDivs = document.getElementsByClassName("operator");
var startButtonDiv = document.getElementById("startButton");

//Esta variable señala la operación en curso que se desplegará.
var idOperation = 1;

stageObject = {
    canvasWidth : undefined,
    canvasHeight : undefined,
    xCanvasStart : undefined,
    yCanvasStart : undefined,
    borderCoverWidth : undefined,   //Ancho de borde en pantalla inicial (Cover).
    minDimension : undefined,    //Mínimo del conjunto {canvasWidth, canvasHeight}
    numDigits : undefined,

    coverFonts : {
        fontFamily : "century gothic",
        fontSize : undefined,
        fontWidth : undefined,
        fontStyle : "normal",
        fontWeight : 500
    },

    operationFonts : {
        fontFamily : "century gothic",
        fontSize : undefined,
        fontWidth : undefined,
        hOffset : undefined,
        vOffset : undefined,
        fontStyle : "normal",
        fontWeight : 500
    },

    coverObject : {
        coverLabels : ["Ejercicios", "Dígitos", "Operación"],
        circleLabel : [
            [4, 6, 8, 10],
            [2, 3, 4, 5],
            ["+", "-"]
        ],
        startButtonLabel : "Start"
    },

    labelLocation : {
        xCoordsLabels : undefined
    },

    circlesLocation : {
        circleRadius : undefined,
        xCenterCircles : [],
        yCenterCircles : []
    },

    mark : {
        x : undefined,
        y : undefined,
        ancho : undefined,
        alto : undefined
    },

    cursor : {
        xPosition : undefined,
        yPosition : undefined,
        width : undefined,
        height : undefined
    },

    homeButtonLocation : {
        xStartButton : undefined,
        yStartButton : undefined,
        radius : undefined
    },

    startButtonLocation : {
        xStartButton : undefined,
        yStartButton : undefined,
        widthStartButton : undefined,
        heightStartButton : undefined
    },

    backButtonLocation : {
        xPosition : undefined,
        yPosition : undefined,
        widthButton : undefined,
        heightButton : undefined
    },

    forwardButtonLocation : {
        xPosition : undefined,
        yPosition : undefined,
        widthButton : undefined,
        heightButton : undefined
    },

    navigationBarLocation : {
        xNavStart : undefined,
        deltaLength : undefined,
        spotDiameter : undefined,
        xSpotCenters : [],
        ySpotCenter : undefined
    },

    operandsLocation : {
        xCoordsOperands : [],
        yCoordsOperands : []
    },

    resultLocation : {
        xCoordsResult : [],
        yCoordResult : undefined
    },

    resultLineLocation : {
        xStartResultLine : undefined,
        yStartResultLine : undefined,
        widthResultLine : undefined,
        heightResultLine : undefined
    },

    myColors : {
        colorCoverCanvas : "lavender",
        colorCanvasOperation : "white",
        colorDocumentBackground : "white",
        colorCircles : "navy",
        colorActiveCircles : "black",
        colorCircleLabels : "white",
        colorActiveCircleLabels : "gray",
        colorStartButton : "navy",
        colorOperands : "#157DEC",
        colorResult : "#437C17",
        colorWrongResult : "red",
        colorSymbol : "gray",
        colorResultLine : "gray",
        colorCursor : "gray",
        colorInactiveSpots : "gray",
        colorActiveSpot : "gray",
        colorSmallSpot : "white",
        colorDeltas : "gray",
        colorNavButtons : "white",
        colorHomeButton : "white"
    },

    setCanvasSize : function (screenWidth, screenHeight) {
        this.canvasWidth = Math.round(0.6 * screenWidth);
        this.canvasHeight = Math.round(0.8 * screenHeight);
        this.xCanvasStart = Math.round(0.2 * screenWidth);
        this.yCanvasStart = Math.round(0.1 * screenHeight);

        //Se establecen la dimensión mínima y el ancho de borde vertical.
        this.minDimension = Math.min(this.canvasWidth, this.canvasHeight);
        this.borderCoverWidth = Math.round((1 / 17) * this.minDimension);

        //Se establecen los valores de tamaño para las fuentes de la portada.
        this.coverFonts.fontSize = Math.round(0.10*this.canvasHeight);
        this.coverFonts.fontWidth = Math.round(0.64*this.coverFonts.fontSize);

        //Se establecen los valores de tamaño para las fuentes de operaciones.
        this.operationFonts.fontSize = Math.round(0.18*this.canvasHeight);
        this.operationFonts.fontWidth = Math.round(0.64*this.operationFonts.fontSize);
        this.operationFonts.hOffset = Math.round(0.25*this.operationFonts.fontWidth);
        this.operationFonts.vOffset = Math.round(0.25*this.operationFonts.hOffset);

        myCanvas.style.position = "absolute";
        myCanvas.style.left = this.xCanvasStart + "px";
        myCanvas.style.top = this.yCanvasStart + "px";
        myCanvas.style.width = this.canvasWidth + "px";
        myCanvas.style.height = this.canvasHeight + "px";

        //Se establecen los valores necesarios para el botón Start.
        this.startButtonLocation.widthStartButton = Math.round(0.20*this.canvasWidth);
        this.startButtonLocation.heightStartButton = Math.round(0.4*this.startButtonLocation.widthStartButton);
        this.startButtonLocation.xStartButton = Math.round(0.40*this.canvasWidth);
        this.startButtonLocation.yStartButton = Math.round(0.80*this.canvasHeight - 0.5*this.startButtonLocation.heightStartButton);

        //Se establecen los valores para los botones Home, Backward y Forward.
        this.homeButtonLocation.radius = Math.round((1/14)*this.minDimension);
        this.homeButtonLocation.xStartButton = this.borderCoverWidth + this.homeButtonLocation.radius;
        this.homeButtonLocation.yStartButton = Math.round(0.50*this.canvasHeight);

        this.backButtonLocation.widthButton = Math.round(0.10*this.canvasWidth);
        this.backButtonLocation.heightButton = Math.round(0.50*this.backButtonLocation.widthButton);
        this.backButtonLocation.xPosition = this.borderCoverWidth;
        this.backButtonLocation.yPosition = Math.round(0.85*this.canvasHeight - 0.50*this.backButtonLocation.heightButton);

        this.forwardButtonLocation.widthButton = this.backButtonLocation.widthButton;
        this.forwardButtonLocation.heightButton = this.backButtonLocation.heightButton;
        this.forwardButtonLocation.xPosition = Math.round(this.canvasWidth - (this.borderCoverWidth + this.forwardButtonLocation.widthButton));
        this.forwardButtonLocation.yPosition = this.backButtonLocation.yPosition;

        //Se crea el objeto Raphael.
        paper = Raphael(myCanvas, this.canvasWidth, this.canvasHeight);

    },

    setCanvasBackground : function () {
        //Dibujar rectángulo con color de fondo "colorCoverCanvas"
        //NOTA: Se usan coordenadas relativas al elemento Canvas.

        backgroundCanvas = paper.rect(0, 0, this.canvasWidth, this.canvasHeight, 30);
        backgroundCanvas.attr({
            fill: this.myColors.colorCoverCanvas
        });
    },

    init : function () {
        //Se inicializan los valores previos de la portada.
        //Comenzamos con la pantalla Cover

        //Inicio para los DIVS de los círculos, coordenadas en relación al Window.
        var xStartDiv = this.xCanvasStart + Math.round((5 / 9) * this.canvasWidth);

        var yStartDiv;
        var circleDiameter;
        var deltaHorizontal;  //Mide el espacio horizontal entre los círculos.
        var deltaVertical;  //Mide el espacio vertical entre los círculos.

        var h;  //Espacio vertical que corresponde a 3/5 de la altura del elemento Canvas.
        var H;  //Espacio horizontal para los círculos.
        var V;  //Espacio vertical para los círculos.
        var i;

        yStartDiv = this.yCanvasStart + this.borderCoverWidth;

        h = Math.round((3 / 5) * this.canvasHeight);
        V = Math.round(h - this.borderCoverWidth);
        H = Math.round((4 / 9) * this.canvasWidth - this.borderCoverWidth);

        if (V / H <= 3 / 4) {
            circleDiameter = Math.round(V / 3);
            deltaHorizontal = Math.round((1 / 3) * (H - 4 * circleDiameter));
            deltaVertical = 0;
        } else {
            circleDiameter = Math.round(H / 4);
            deltaHorizontal = 0;
            deltaVertical = Math.round((1 / 2) * (V - 3 * circleDiameter));
        }

        this.circleRadius = circleDiameter;

        //Se establecen las coordenadas de los elementos DIV de cada círculo en la Portada
        //NOTA: Se usan coordenadas relativas al monitor, no al elemento Canvas.
        /*
         for (i = 0; i < 4; i++) {
         this.divsLocation.xCoordsDivs[i] = xStartDiv + i * (circleDiameter + deltaHorizontal);
         }

         for (i = 0; i < 3; i++) {
         this.divsLocation.yCoordsDivs[i] = yStartDiv + i * (circleDiameter + deltaVertical);
         }

         //Se establece la longitud de los lados de cada elemeto DIV de los círculos.
         */

        //Se establecen las coordenadas de los centros de cada círculo en la Portada
        //NOTA: Se usan coordenadas relativas al elemento Canvas.
        for (i = 0; i < 4; i++) {
            this.circlesLocation.xCenterCircles[i] = Math.round(Math.round((5 / 9) * this.canvasWidth) + 0.5 * circleDiameter) + i * (circleDiameter + deltaHorizontal);
        }

        for (i = 0; i < 3; i++) {
            this.circlesLocation.yCenterCircles[i] = Math.round(this.borderCoverWidth + 0.5 * circleDiameter) + i * (circleDiameter + deltaVertical);
        }

        //Se establece la posición del div que cubre al startButton
        //NOTA: Se usan coordenadas relativas al monitor, no al elemento Canvas.

    },

    drawLabels : function () {

        var num = this.coverObject.coverLabels.length;
        var i;
        var index = 0;
        this.labelLocation.xCoordsLabels = this.borderCoverWidth;

        for (i = 0; i < num; i++) {
            leftLabels[index] = paper.text(this.labelLocation.xCoordsLabels, this.circlesLocation.yCenterCircles[i], this.coverObject.coverLabels[i]);
            leftLabels[index].attr({
                "fill":"#17A9C6", // font-color
                "cursor" : "pointer",
                "font-size" : this.coverFonts.fontSize, // font size in pixels
                //text-anchor indicates the starting position of the text relative tothe X, Y position.It can be "start", "middle" or  "end" default is "middle"
                "text-anchor":"start",
                "font-family" : this.coverFonts.fontFamily // font family of the text
            });
            index++;
        }

        for (i = 0; i < num; i++) {
            leftLabels[i].mouseover(function(){
                this.toFront();
                this.animate({
                    "fill":"#17A9C6",
                    "transform":"s1.2"}, 100, "bounce")
            });

            leftLabels[i].mouseout(function(){
                this.toFront();
                this.animate({
                    "fill":"#17A9C6",
                    "transform":"s1"}, 100, "bounce")
            });
        }
    },

    drawCircles : function () {
        var i, j;
        var index = 0;

        for (i = 0; i < 3; i++) {
            var circlesPerRow = this.coverObject.circleLabel[i].length;

            for (j = 0; j < circlesPerRow; j++) {

                //var mycircle = paper.circle(this.circlesLocation.xCenterCircles[i], this.circlesLocation.yCenterCircles[0], 50);
                circles[index] = paper.circle(this.circlesLocation.xCenterCircles[j], this.circlesLocation.yCenterCircles[i], 0.5*this.circleRadius);
                circles[index].attr({
                    "fill" : this.myColors.colorCircles,
                    "opacity" : 0.5,
                    "stroke-width" : 0,
                    "cursor" : "pointer"
                });

                index++;
            }
        }

        //Aquí se establece el efecto de animación para los círculos.
        for (i = 0; i < 10; i++) {

            circles[i].mouseover(function(){
                this.toFront();
                this.animate({
                    "fill" : "navy",
                    "opacity" : 0.1,
                    "transform":"s1.3"}, 100, "bounce")
            });

            circles[i].mouseout(function(){
                this.animate({
                    "fill": "navy",
                    "opacity" : 0.5,
                    "transform" : "s1"}, 400, "bounce");
                stageObject.drawCircleLabels();
            });
        }
    },

    drawCircleLabels : function () {
        //Se dibujan las etiquetas de los círculos.
        //var num = this.coverObject.circleLabel[0].length;
        var i, j;
        var index = 0;

        for (j = 0; j < 3; j++) {
            var numColumns = this.coverObject.circleLabel[j].length;

            for (i = 0; i < numColumns; i++) {
                circleLabels[index] = paper.text(this.circlesLocation.xCenterCircles[i], this.circlesLocation.yCenterCircles[j], this.coverObject.circleLabel[j][i]);
                circleLabels[index].attr({
                    "fill" : "white", // font-color
                    "font-size" : 0.6*this.circleRadius, // font size in pixels
                    //text-anchor indicates the starting position of the text relative tothe X, Y position.It can be "start", "middle" or  "end" default is "middle"
                    "text-anchor" : "middle",
                    "font-family" : this.coverFonts.fontFamily // font family of the text
                });
                index++;
            }
        }
    },

    drawStartButton : function() {
        //Se declaran las variables locales auxiliares.
        var xTextButton, yTextButton;

        //Se dibuja el botón "Start"
        startButton = paper.rect(this.startButtonLocation.xStartButton,
            this.startButtonLocation.yStartButton,
            this.startButtonLocation.widthStartButton,
            this.startButtonLocation.heightStartButton);

        //Se dibuja el texto del botón "Start"
        xTextButton = Math.round(this.startButtonLocation.xStartButton + 0.50*this.startButtonLocation.widthStartButton);
        yTextButton = Math.round(this.startButtonLocation.yStartButton + 0.50*this.startButtonLocation.heightStartButton);

        labelStartButton = paper.text(xTextButton, yTextButton, this.coverObject.startButtonLabel);

        labelStartButton.attr({
            "fill":"white", // font-color
            "font-size" : this.coverFonts.fontSize, // font size in pixels
            //text-anchor indicates the starting position of the text relative tothe X, Y position.It can be "start", "middle" or  "end" default is "middle"
            "text-anchor":"middle",
            "font-family" : this.coverFonts.fontFamily // font family of the text
        });

        startButton.attr({
            "fill" : this.myColors.colorStartButton,
            "stroke-width" : 0
        });

        //Se crea el conjunto botón-etiqueta
        startButtonSet = paper.set();
        startButtonSet.push(startButton, labelStartButton);
        startButtonSet.attr({
            "cursor" : "pointer"
        });

        startButtonSet.mouseover(function(){
            startButton.animate({
                "transform":"s1.2"}, 100, "bounce");

            labelStartButton.animate({
                "transform":"s1.2"}, 100, "bounce");
        });

        startButtonSet.mouseout(function(){
            startButton.animate({
                "transform":"s1"}, 100, "bounce");

            labelStartButton.animate({
                "transform":"s1"}, 100, "bounce");
        });
    },

    showCircleDivs : function() {

    },
    //###############################################################################
    //Las funciones siguientes son ejecutadas después de pulsar el botón "Start".   #
    //###############################################################################

    initializeBlackBoard : function(numDigits, numOperations) {
        //Se declaran todas las variables auxiliares de esta sección del código.
        var yDigitStart, xDigitStart, xStartResult, i;

        //Se establecen las coordenadas de cada círculo en la Barra de Navegación
        //NOTA: Se usan coordenadas relativas al elemento Canvas.
        this.numDigits = numDigits;

        this.navigationBarLocation.spotDiameter = Math.round((1 / 20) * this.minDimension);
        this.navigationBarLocation.xNavStart = Math.round(0.10 * this.canvasWidth + 0.50*this.navigationBarLocation.spotDiameter);
        this.navigationBarLocation.ySpotCenter = Math.round(0.10 * this.canvasHeight);
        this.navigationBarLocation.deltaLength = Math.round((0.80 * this.canvasWidth - numOperations * this.navigationBarLocation.spotDiameter) / (numOperations - 1));

        for (i = 0; i < numOperations; i++) {
            this.navigationBarLocation.xSpotCenters[i] = this.navigationBarLocation.xNavStart + i * (this.navigationBarLocation.spotDiameter + this.navigationBarLocation.deltaLength);

        }

        //Se establecen las coordenadas de ubicación de los operandos.
        yDigitStart = Math.round(0.30*this.canvasHeight);
        xDigitStart = Math.round(0.50*this.canvasWidth - (0.50*this.numDigits*this.operationFonts.fontWidth
            + 0.50*(this.numDigits - 1)*this.operationFonts.hOffset));

        //Se generan las coordenadas horizontales de cada dígito.
        //NOTA: En relación al Canvas.
        for (i = 0; i < this.numDigits; i++) {
            this.operandsLocation.xCoordsOperands[i] = xDigitStart + i * (this.operationFonts.fontWidth + this.operationFonts.hOffset);
        }

        //Se generan las coordenadas verticales de cada renglón de los operandos.
        //NOTA: En relación al Canvas.
        for (i = 0; i < 2; i++) {
            this.operandsLocation.yCoordsOperands[i] = yDigitStart + i * (this.operationFonts.fontSize + this.operationFonts.vOffset);
        }

        //Se establecen las coordenadas de ubiación de los dígitos del resultado.
        xStartResult = this.operandsLocation.xCoordsOperands[0] - (this.operationFonts.fontWidth + this.operationFonts.hOffset);
        this.resultLocation.yCoordResult = Math.round(0.30*this.canvasHeight) + 2*this.operationFonts.fontSize + 3*this.operationFonts.vOffset;

        for (i = 0; i < this.numDigits + 1; i++) {
            this.resultLocation.xCoordsResult[i] = xStartResult + i * (this.operationFonts.fontWidth + this.operationFonts.hOffset);

        }

        //Se establecen la posición y tamaño de la palomita (mark.png).
        this.mark.x = this.operandsLocation.xCoordsOperands[this.numDigits - 1] + this.operationFonts.fontWidth + this.operationFonts.hOffset;
        this.mark.y = this.operandsLocation.yCoordsOperands[0];
        this.mark.ancho = 2*this.operationFonts.fontWidth;
        this.mark.alto = this.mark.ancho;

        //A continuación, se establecen los valores para la línea del resultado.
        this.resultLineLocation.xStartResultLine = this.resultLocation.xCoordsResult[0] + 0.5*this.operationFonts.fontWidth;
        this.resultLineLocation.yStartResultLine = Math.round(0.30*this.canvasHeight) + 1.5*this.operationFonts.fontSize + this.operationFonts.vOffset;
        this.resultLineLocation.widthResultLine = (this.numDigits + 1)*(this.operationFonts.fontWidth)
            + (this.numDigits - 1)*(this.operationFonts.hOffset);
        this.resultLineLocation.heightResultLine = (1/65)*this.minDimension;

        //Se establecen las coordenadas del símbolo de "palomita"
        //NOTA: Se usan coordenadas relativas al elemento Canvas.


    },
    //#########################################################################################
    //Las funciones de esta sección tienen por objeto el renderizado de elementos del pizarrón.
    //#########################################################################################
    displayNavigationButtons : function() {
        //Declaración de variables auxiliares locales.
        var backButtonLabel, forwardButtonLabel;
        var backButton, forwardButton;

        homeButtonSet = paper.set();
        backButtonSet = paper.set();
        forwardButtonSet = paper.set();

        //Se dibuja el botón 'Home'.
        homeButton = paper.circle(this.homeButtonLocation.xStartButton,
            this.homeButtonLocation.yStartButton,
            this.homeButtonLocation.radius);

        homeButton.attr({
            "fill" : this.myColors.colorHomeButton,
            "stroke-width" : 0
        });

        homeIcon = paper.image("assets/home.png", this.homeButtonLocation.xStartButton - 0.5*this.homeButtonLocation.radius,
            this.homeButtonLocation.yStartButton - 0.5*this.homeButtonLocation.radius,
            this.homeButtonLocation.radius,
            this.homeButtonLocation.radius);

        homeButtonSet.push(homeButton, homeIcon);

        homeButtonSet.attr({
            "cursor" : "pointer"
        });

        //Se dibuja el botón 'back'.
        backButton = paper.rect(this.backButtonLocation.xPosition, this.backButtonLocation.yPosition,
            this.backButtonLocation.widthButton, this.backButtonLocation.heightButton);
        backButton.attr({
            "fill" : this.myColors.colorNavButtons,
            "stroke-width" : 0
        });

        backButtonLabel = paper.image("assets/left.png", this.backButtonLocation.xPosition, this.backButtonLocation.yPosition, 0.15*this.minDimension, 0.13*this.minDimension);

        backButtonSet.push(backButton, backButtonLabel);
        backButtonSet.attr({
            "cursor" : "pointer"
        });


        //Se dibuja el botón 'Forward'.
        forwardButton = paper.rect(this.forwardButtonLocation.xPosition, this.forwardButtonLocation.yPosition,
            this.forwardButtonLocation.widthButton, this.forwardButtonLocation.heightButton);

        forwardButton.attr({
            "fill" : this.myColors.colorNavButtons,
            "stroke-width" : 0
        });

        forwardButtonLabel = paper.image("assets/right.png", this.canvasWidth - (0.15*this.minDimension + this.borderCoverWidth), this.forwardButtonLocation.yPosition, 0.15*this.minDimension, 0.13*this.minDimension);

        forwardButtonSet.push(forwardButton, forwardButtonLabel);
        forwardButtonSet.attr({
            "cursor" : "pointer"
        });
    },

    displayBlackBoard : function(myOperation) {//##############################################

        //Se declaran todas las variables auxiliares de esta sección del código.
        var i, j, resultLine, operationSymbol;
        var index = 0;

        //Primero, se dibujan las líneas enlazantes.
        for (i = 0; i < numOperations - 1; i++) {
            paper.rect(this.navigationBarLocation.xSpotCenters[i],
                    this.navigationBarLocation.ySpotCenter - (1/200)*this.minDimension,
                    this.navigationBarLocation.deltaLength + this.navigationBarLocation.spotDiameter,
                    (1/100)*this.minDimension).attr({
                    "fill" : this.myColors.colorDeltas,
                    "stroke-width" : 0
                });
        }

        //Luego, se dibujan los círculos de la barra de navegación, y se establecen sus atributos.
        for (i = 0; i < numOperations; i++) {
            navBarCircles[i] = paper.circle(this.navigationBarLocation.xSpotCenters[i], this.navigationBarLocation.ySpotCenter, 0.50*this.navigationBarLocation.spotDiameter);
            navBarCircles[i].attr({
                "fill" : this.myColors.colorInactiveSpots,
                "stroke-width" : 0
            });
        }

        //A continuación se trazan los dígitos de los operandos.
        for (i = 0; i < 2; i++) {
            for (j = 0; j < this.numDigits; j++) {
                digits[index] = paper.text(this.operandsLocation.xCoordsOperands[j], this.operandsLocation.yCoordsOperands[i], myOperation.operands[i][j]);
                digits[index].attr({
                    "fill": this.myColors.colorOperands, // font-color
                    "font-size":this.operationFonts.fontSize, // font size in pixels
                    //text-anchor indicates the starting position of the text relative tothe X, Y position.It can be "start", "middle" or  "end" default is "middle"
                    "text-anchor":"start",
                    "font-family":"verdana" // font family of the text
                });
                index++;
            }
        }

        //A continuación, se dibuja la línea del resultado.
        resultLine = paper.rect(this.resultLineLocation.xStartResultLine - 0.50*this.operationFonts.fontWidth,
            this.resultLineLocation.yStartResultLine,
            this.resultLineLocation.widthResultLine + 0.50*this.operationFonts.fontWidth,
            this.resultLineLocation.heightResultLine);
        resultLine.attr({
            fill : this.myColors.colorResultLine,
            "stroke-width" : 0
        });

        //Ahora, se traza el signo del operador.
        operationSymbol = paper.text(this.resultLocation.xCoordsResult[0], this.operandsLocation.yCoordsOperands[1], myOperation.operator);

        operationSymbol.attr({
            "fill" : this.myColors.colorSymbol, // font-color
            "font-size" : this.operationFonts.fontSize, // font size in pixels
            //text-anchor indicates the starting position of the text relative tothe X, Y position.It can be "start", "middle" or  "end" default is "middle"
            "text-anchor" : "start",
            "font-family" : "verdana" // font family of the text
        });

        /*
         //Se traza el resultado de la operación actual.
         for (i = 0; i < this.numDigits + 1; i++) {
         paper.circle(this.resultLocation.xCoordsResult[i], this.resultLocation.yCoordResult, 10);
         paper.text(this.resultLocation.xCoordsResult[i], this.resultLocation.yCoordResult, i).attr({
         "fill":"#17A9C6", // font-color
         "font-size":this.operationFonts.fontSize, // font size in pixels
         //text-anchor indicates the starting position of the text relative tothe X, Y position.It can be "start", "middle" or  "end" default is "middle"
         "text-anchor":"start",
         "font-family":"verdana" // font family of the text
         });
         paper.rect(this.resultLocation.xCoordsResult[i], this.resultLocation.yCoordResult, 10, 10);
         }*/

    },

    renderDigit : function(myOperation, userType, status) {

        if (wrongDigit !== undefined) {
            wrongDigit.remove();
        }
        var indexOfDigits = myOperation.userTry.length; //Este índice va de 0, 1, ...
        var indexOfCoords = myOperation.numDigits - indexOfDigits;

        if (status === true) {//El dígito a renderizar es el correcto.
            resultDigits[indexOfDigits] = paper.text(this.resultLocation.xCoordsResult[indexOfCoords], this.resultLocation.yCoordResult, userType).attr({
                "fill" : this.myColors.colorResult, // font-color
                "font-size":this.operationFonts.fontSize, // font size in pixels
                //text-anchor indicates the starting position of the text relative tothe X, Y position.It can be "start", "middle" or  "end" default is "middle"
                "text-anchor":"start",
                "font-family":"verdana" // font family of the text
            });

        } else {//El dígito a renderizar es incorrecto.
            wrongDigit = paper.text(this.resultLocation.xCoordsResult[indexOfCoords], this.resultLocation.yCoordResult, userType).attr({
                "fill": this.myColors.colorWrongResult, // font-color
                "font-size":this.operationFonts.fontSize, // font size in pixels
                //text-anchor indicates the starting position of the text relative tothe X, Y position.It can be "start", "middle" or  "end" default is "middle"
                "text-anchor":"start",
                "font-family":"verdana" // font family of the text
            });
        }
    },

    renderWholeResult : function(myOp) {
        var i, resultMaxLong, resultActualLong;

        resultMaxLong = myOp.numDigits + 1;
        resultActualLong = myOp.result.length;

        for (i = 0; i < resultActualLong; i++) {
            resultDigits[i] = paper.text(this.resultLocation.xCoordsResult[resultMaxLong - (i+1)], this.resultLocation.yCoordResult, myOp.userTry[resultActualLong - (i+1)]).attr({
                "fill" : this.myColors.colorResult, // font-color
                "font-size":this.operationFonts.fontSize, // font size in pixels
                //text-anchor indicates the starting position of the text relative tothe X, Y position.It can be "start", "middle" or  "end" default is "middle"
                "text-anchor":"start",
                "font-family":"verdana" // font family of the text
            });
        }
    },

    turnOnSpot : function(idOperation) {
        navBarCircles[idOperation - 1].attr({
            "fill" : "white",
            "stroke" : "gray",
            "stroke-width" : (1/100)*this.minDimension
        });
    },

    showMark : function() {
        myMark = paper.image("assets/mark.png", this.mark.x, this.mark.y, this.mark.ancho, this.mark.alto);
    },

    init_cursor : function() {
        this.cursor.xPosition = this.resultLocation.xCoordsResult[this.numDigits] - 0.5*this.operationFonts.hOffset;
        this.cursor.yPosition = this.resultLocation.yCoordResult + 0.5*this.operationFonts.fontSize;
        this.cursor.width = this.operationFonts.fontWidth + this.operationFonts.hOffset;
        this.cursor.height = this.resultLineLocation.heightResultLine;
    },

    moveCursorLeft : function() {
        this.cursor.xPosition -= this.cursor.width;
    },

    showCursor : function() {
        myCursor = paper.rect(this.cursor.xPosition, this.cursor.yPosition, this.cursor.width, this.cursor.height);
        myCursor.attr({
            "fill" : "gray",
            "stroke-width" : 0
        });
    },

    changeCursorState : function() {

        if (cursorOn === true) {
            cursorOn = false;
        } else {
            cursorOn = true;
        }

        if (cursorOn === true) {
            myCursor.attr({
                "fill" : "gray",
                "stroke-width" : 0
            });
        }
        else {
            myCursor.attr({
                "fill" : "white",
                "stroke-width" : 0
            });
        }
    }

};

//Sección de definición de Constructores.################################################

function Operation(numDigits, symbol) {
    //Declaración de variables locales auxiliares.
    var i;
    this.solved = false;
    this.operator = symbol;
    this.operands = [];
    this.result = [];
    this.userTry = [];
    this.minuendo = [];
    this.sustraendo = [];
    this.numDigits = numDigits;

    this.init = function() {
        this.getOperands();
        this.getResult();
    };

    this.getOperands = function() {
        //Generación aleatoria de dígitos
        this.operands[0] = [];
        this.operands[1] = [];

        for (i = 0; i < this.numDigits; i++) {
            this.operands[0].push(Math.floor((Math.random()*9)));
        }

        for (i = 0; i < this.numDigits; i++) {
            this.operands[1].push(Math.floor((Math.random()*9)));
        }
    };

    this.getResult = function() {
        //Sección de declaración de variables locales
        var operand1, operand2, minuendo, sustraendo,
            result, string_result, string_minuendo, string_sustraendo;

        //Aquí se obtienen los valores numéricos de cada operando, a partir del array de operandos.
        operand1 = parseInt(this.operands[0].join(""));
        operand2 = parseInt(this.operands[1].join(""));

        result = operand1 + operand2;
        minuendo = operand1;
        sustraendo = operand2;

        //Aquí se calcula el resultado y se rellena el array this.result con el resultado.
        if (this.operator === "+") {//Para el caso de la suma.

            string_result = result.toString().split("");

            for (i = 0; i < string_result.length; i++) {
                this.result.push(Number(string_result[i]));
            }
        }

        if (this.operator === "-") {//Para el caso de la resta.

            //Asignar al minuendo el mayor de los operandos.
            if (operand2 > operand1) {
                minuendo = operand2;
                sustraendo = operand1;
            }

            result = minuendo - sustraendo;

            //A continuación se rellenan el minuendo, el sustraendo y el resultado.
            string_result = result.toString().split("");
            string_minuendo = minuendo.toString().split("");
            string_sustraendo = sustraendo.toString().split("");

            for (i = 0; i < string_minuendo.length; i++) {
                this.minuendo.push(Number(string_minuendo[i]));
            }

            for (i = 0; i < string_sustraendo.length; i++) {
                this.sustraendo.push(Number(string_sustraendo[i]));
            }

            for (i = 0; i < string_result.length; i++) {
                this.result.push(Number(string_result[i]));
            }

            if (this.minuendo.length < this.numDigits) {
                //Rellenar con ceros a la izquierda
                result = this.numDigits - this.minuendo.length;

                for (i = 0; i < result; i++) {
                    this.minuendo.unshift(0);
                }
            }

            if (this.sustraendo.length < this.numDigits) {
                //Rellenar con ceros a la izquierda
                result = this.numDigits - this.sustraendo.length;

                for (i = 0; i < result; i++) {
                    this.sustraendo.unshift(0);
                }
            }

            this.operands[0] = this.minuendo;
            this.operands[1] = this.sustraendo;
        }//Fin del caso de la resta.

        //Esta sección del código rellena ceros a la izquierda, en caso de ser necesario.
        if (this.result.length < this.numDigits) {
            //Rellenar con ceros a la izquierda
            result = this.numDigits - this.result.length;

            for (i = 0; i < result; i++) {
                this.result.unshift(0);
            }
        }

    };
}

//Sección de definición de Manejadores de Eventos. ###################################################

function keyUpHandler(event) {
    //Sección de variables auxiliares locales.
    var codes, userType, index, userIndex;

    //Decodificar tecla presionada.
    codes = {48:0, 49:1, 50:2, 51:3, 52:4, 53:5, 54:6, 55:7,56:8,57:9};

    if (codes[event.keyCode] !== undefined) {//Si la tecla presionada es numérica...
        userType = codes[event.keyCode];
    }

    //Revisar si eldígito introducido por el usuario es el correcto.
    //      revisar longitud actual de la propiedad myOperation.userTry.
    userIndex = myOperation.userTry.length;

    //La variable index almacena la posición actual que debe observarse en el array result.
    index = myOperation.result.length - (userIndex + 1);

    if (userType === myOperation.result[index]) {//El dígito introducido es el correcto.
        stageObject.renderDigit(myOperation, userType, true);
        myCursor.remove();
        stageObject.moveCursorLeft();
        //Actualizar myOperation.userTry
        myOperation.userTry.unshift(userType);

        if (myOperation.userTry.length === myOperation.result.length) {
            //La operación se ha completado exitosamente.
            //Primero, mostrar la palomita.
            stageObject.showMark();

            // Segundo, actualizar la propiedad solved del objeto myOperation.
            myOperation.solved = true;

            //Finalmente, almacenar el objeto myOperation actualizado.
            sessionStorage.setItem("operation" + idOperation, JSON.stringify(myOperation));

        } else {stageObject.showCursor();}

    } else {//El dígito introducido es incorrecto.

        //Dibujar en rojo en la posición que le corresponde.
        stageObject.renderDigit(myOperation, userType, false);
    }
}


//Sección de definición de funciones. #########################################################

function loadCurrentOperation() {
    //Devuelve la operación cuyo idOperation corresponda al actual.
    var label = "operation" + idOperation;

    return JSON.parse(sessionStorage.getItem(label));
}

function showNextOperation() {
    var i;

    //Se remueven los dígitos de la operación actualmente en pantalla.
    if (digits.length > 0) {
        for (i = 0; i < digits.length; i++ ) {
            digits[i].remove();
        }
    }

    if (resultDigits.length > 0) {
        for (i = 0; i < resultDigits.length; i++ ) {
            resultDigits[i].remove();
        }
    }

    //Se remueve la palomita, en caso de haberse mostrado.
    if (myMark !== undefined) {
        myMark.remove();
    }

    //Se carga la siguiente operación que corresponde al idOperation actual.
    myOperation = loadCurrentOperation();

    //Se muestran los dígitos de la nueva operación.
    stageObject.displayBlackBoard(myOperation);

    //Activar el spot correspondiente en la barra de navegación.
    stageObject.turnOnSpot(idOperation);

    //Se coloca el cursor en la posición correcta de inicio.
    stageObject.init_cursor();

    //Si myOperation.solved === true, mostrar el resultado...
    if (myOperation.solved === true) {
        stageObject.renderWholeResult(myOperation);
    } else {


        //Se renderiza el cursor.
        stageObject.showCursor();
        cursorHandler = setInterval(stageObject.changeCursorState, 500);

    }
    //...
}

function prepareBlackBoard() {//################################################################
    //Sección de declaración de variables auxiliares locales.
    var i, keyStore;

    //Se limpia el pizarrón.
    paper.clear();

    backgroundCanvas = paper.rect(0, 0, stageObject.canvasWidth, stageObject.canvasHeight, 30);
    backgroundCanvas.attr({
        fill: "white"
    });

    //Se establecen las coordenadas de la barra de navegación.
    stageObject.initializeBlackBoard(numDigits, numOperations); //HECHO

    //Se crean las operaciones.
    //  Se comienzan borrando todos los datos de sesión.
    sessionStorage.clear();

    //A continuación se generan, inicializan y almacenan las operaciones.
    for (i = 1; i <= numOperations; i++) {

        keyStore = "operation" + i;
        myOperation = new Operation(numDigits, operatorSymbol);
        myOperation.init();

        sessionStorage.setItem(keyStore, JSON.stringify(myOperation));

    }

    stageObject.displayNavigationButtons();

    //Se establecen los eventos de los botones de navegación.

    homeButtonSet.mouseover(function() {
        homeButton.attr({
            "stroke" : "gray",
            "stroke-width" : 5
        });
    });

    homeButtonSet.mouseout(function() {
        homeButton.attr({
            "stroke-width" : 0
        });
    });

    homeButtonSet.click(function() {
        //Primero, se elimina la instancia de fondo, para no crearla repetidas veces.
        backgroundCanvas.remove();

        //Segundo, se cancela el cursorHandler.
        clearInterval(cursorHandler);
        myCursor.remove();

        //Se remueven los dígitos de la operación actualmente en pantalla.
        if (digits.length > 0) {
            for (i = 0; i < digits.length; i++ ) {
                digits[i].remove();
            }
        }

        if (resultDigits.length > 0) {
            for (i = 0; i < resultDigits.length; i++ ) {
                resultDigits[i].remove();
            }
        }

        //Se remueve la palomita, en caso de haberse mostrado.
        if (myMark !== undefined) {
            myMark.remove();
        }

        //Tercero, se muestra la pantalla de portada nuevamente.
        showCover();
    });

    backButtonSet.click(function() {
        if (idOperation > 1) {
            idOperation--;
            clearInterval(cursorHandler);
            myCursor.remove();
            showNextOperation();
        }
    });

    forwardButtonSet.click(function() {
        if (idOperation < numOperations) {
            idOperation++;
            clearInterval(cursorHandler);
            myCursor.remove();
            showNextOperation();
        }
    });

    //Inicializar el cursor.

    //Se define el eventListener para la presión de teclas.
    document.addEventListener("keyup", keyUpHandler, false);

    showNextOperation();

}

//Esta parte del código es la que establece los elementos permanentes de cada tanda de ejercicios.
function showCover() {
    //Valores por defecto de las posibles elecciones del usuario.
    numOperations = 4;
    numDigits = 2;
    operatorSymbol = "+";
    idOperation = 1;

    stageObject.init();
    stageObject.setCanvasBackground();     //Hecho.
    stageObject.drawLabels();
    stageObject.drawCircles();
    stageObject.drawCircleLabels();
    stageObject.drawStartButton();
    stageObject.showCircleDivs();

    circles[0].click(function() {
        numOperations = 4;
    });

    circles[1].click(function() {
        numOperations = 6;
    });

    circles[2].click(function() {
        numOperations = 8;
    });

    circles[3].click(function() {
        numOperations = 10;
    });

    circles[4].click(function() {
        numDigits = 2;
    });

    circles[5].click(function() {
        numDigits = 3;
    });

    circles[6].click(function() {
        numDigits = 4;
    });

    circles[7].click(function() {
        numDigits = 5;
    });

    circles[8].click(function() {
        operatorSymbol = "+";
    });

    circles[9].click(function() {
        operatorSymbol = "-";
    });

    startButtonSet.click(function() {
        prepareBlackBoard();
    });
}

//El programa inicia a partir de este punto.
screenWidth = window.innerWidth;
screenHeight = window.innerHeight;

stageObject.setCanvasSize(screenWidth,screenHeight);  //Hecho.
showCover();

//#####################   FIN DEL SCRIPT     ###################################################
