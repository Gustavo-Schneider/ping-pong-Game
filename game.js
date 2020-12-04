        window.onload = function() {
            variaveis();
            setInterval(principal, 1000/60);
        }
        
        function variaveis(){

            folhaDesenho = document.getElementById("folha");
            areaDesenho = folhaDesenho.getContext("2d");
            largCampo = 600;
            altCampo = 500;
            largRede = 5;
            altRaquete = 70;
            espessuraRaquete = 5;
            efeitoRaquete = 0.3;
            velocidadeJogador2 = 3;
            //velocidadeJogador1 = 7; // Usar essa veriavel caso queira dois computadores jogando
            diametroBola = 8;
            posicaoJogador1 = posicaoJogador2 = 40;
            posicaoBolaX = posicaoBolaY = 10;
            velocidadeBolaPosicaoX = velocidadeBolaPosicaoY = 3;
            pontuacaoJogador1 = pontuacaoJogador2 = 0;
        }

        function principal(){
            desenhar();
            calcular();
        }

        function desenhar(){
            //Campo
            areaDesenho.fillStyle = '#286047';
            areaDesenho.fillRect(0, 0, largCampo, altCampo);

            //Linha da metade do campo
            areaDesenho.fillStyle = '#ffffff';
            areaDesenho.fillRect(largCampo/2 - largRede / 2, 0, largRede, altCampo);

            //Raquete jogador
            areaDesenho.fillRect(0, posicaoJogador1, espessuraRaquete, altRaquete);
            //Raquete adversario
            areaDesenho.fillRect(largCampo - espessuraRaquete, posicaoJogador2, espessuraRaquete, altRaquete);

            //Bola
            areaDesenho.fillRect(posicaoBolaX - diametroBola / 2, posicaoBolaY - diametroBola / 2, diametroBola, diametroBola);
            
            //Placar
            areaDesenho.fillText("Jogador - " + pontuacaoJogador1 + " pontos", 100, 100);
            
            areaDesenho.fillText("Computador - " + pontuacaoJogador2 + " pontos", 400, 100);
        }

        function ballReset(){
            posicaoBolaX = largCampo / 2;
            posicaoBolaY = altCampo / 2;
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
            velocidadeBolaPosicaoY = 3;

        }

        function calcular(){

        desenhar();
        
        posicaoBolaX = posicaoBolaX + velocidadeBolaPosicaoX;
        posicaoBolaY = posicaoBolaY + velocidadeBolaPosicaoY;

        //verifica lateral superior
        if (posicaoBolaY < 0 && velocidadeBolaPosicaoY < 0) {
            velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
        }
        //verifica lateral inferior
        if (posicaoBolaY > altCampo && velocidadeBolaPosicaoY > 0) {
            velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
        }

        //verifica se o jogador2 marcou ponto
        if (posicaoBolaX < 0) {
            if (posicaoBolaY > posicaoJogador1 && posicaoBolaY < posicaoJogador1 + altRaquete){
                //rebate a bola
                velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

                var diferecaY = posicaoBolaY - (posicaoJogador1 + altRaquete / 2);
                velocidadeBolaPosicaoY = diferecaY*efeitoRaquete;
            } else{
                // Pontuação jogador2
                pontuacaoJogador2 = pontuacaoJogador2 + 1;
                // Resetar bola
                ballReset();
            }
        }

        //verifica se o jogador1 marcou ponto
        if (posicaoBolaX > largCampo) {
            if (posicaoBolaY > posicaoJogador2 && posicaoBolaY < posicaoJogador2 + altRaquete){
                //rebater bola
                velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

                var diferecaY = posicaoBolaY - (posicaoJogador2 + altRaquete / 2);
                velocidadeBolaPosicaoY = diferecaY * efeitoRaquete;
            } else {
                // Pontuação jogador1
                pontuacaoJogador1 = pontuacaoJogador1 + 1;
                velocidadeJogador2 = velocidadeJogador2 +0.5;
                altRaquete = altRaquete - 2
                // Resetar bola
                ballReset();
            }
        }

        folhaDesenho.addEventListener('mousemove', function(e){
        posicaoJogador1 = e.clientY - altRaquete;
        });

        if(posicaoJogador2 + altRaquete / 2 < posicaoBolaY){
            posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
        } else {
            posicaoJogador2 = posicaoJogador2 + -velocidadeJogador2;
        }

    }