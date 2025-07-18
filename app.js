// JS BACKEND - Versão 0.08 17/07/2025

// Esta é uma aplicação para geração de projetos luminotécnicos para Aviários
// Com o objetivo de gerar de forma rápida e eficiênte tal cálculo, condensando tal processo



// Variaveis Globais
let N_lamps_final = 0;

// Declaração do botão de Calcular (submit)
document.getElementById('calcForm').addEventListener('submit', function(event) {
    event.preventDefault();
});
 
// Início da rotina do programa
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calcForm');
    const resultDiv = document.getElementById('result');
    const clearBtn = document.getElementById('clearBtn');
    const editLampBtn = document.getElementById('editLampBtn');
    const field11 = document.getElementById('field11');
    const field12 = document.getElementById('field12');
    const field16 = document.getElementById('field16');
    const downloadBtn = document.getElementById('downloadPdfBtn');

    clearBtn.addEventListener('click', function() {
        form.reset();
        resultDiv.innerHTML = "";
        field11.disabled = true;
        field12.disabled = true;
        field16.disabled = false;
        field11.placeholder = "lúmens";
        field12.placeholder = "Watts";
        editLampBtn.disabled = false;
    });

    editLampBtn.addEventListener('click', function() {
        field11.disabled = false;
        field12.disabled = false;
        field16.disabled = true;
        field16.value = '';
        field11.placeholder = "lúmens";
        field12.placeholder = "Watts";
        editLampBtn.disabled = true;
    });

    // Dropdown for Luminárias
        const products = [
            { name: "34022 LAMPADA LED INOBRAM WY-05 E27 10W 220V 4500K BRANCA DIMERIZAVEL", value: "1", f: 1200, P: 10 },
            { name: "31561 LAMPADA LED GALAXY A60 CONCEPT E27 9,5W 240V 6500K BRANCA DIMERIZAVEL", value: "2", f: 810, P: 9.5 },
            { name: "34023 LAMPADA LED INOBRAM WY-06 E27 10W 220V 2700K AMARELA DIMERIZAVEL", value: "3", f: 900, P: 10 },
            { name: "25877 LAMPADA LED OSRAM E27 17W 220V 6500K BRANCA NÃO DIMERIZAVEL", value: "4", f: 1521, P: 17 },
            { name: "385324 LAMPADA LED TUBULAR T20/120 20W 3000K", value: "5", f: 1850, P: 20 },
            { name: "9253 LAMPADA LED INOBRAM WY-04 E27 10W 220V 2700K AMARELA DIMERIZAVEL", value: "6", f: 900, P: 10 },
            { name: "7630 LAMPADA LED BRILIA E27 15W 100V - 240V 3000K AMARELA NAO DIMERIZAVEL", value: "7", f: 1311, P: 15 },
            { name: "34349 LAMPADA LED GALAXY BULBO A60 E27 12W 240V 3000K AMARELA NÃO DIMERIZAVEL", value: "8", f: 1018, P: 12 },
            { name: "33617 LAMPADA LED EMPALUX E27 9W 220V 2400K BRANCO QUENTE NAO DIMERIZAVEL", value: "9", f: 810, P: 9 },
            { name: "387233 LAMPADA LED GALAXY E27 15W 100V - 240V 3000K AMARELA NAO DIMERIZAVEL", value: "10", f: 1300, P: 15 },
            { name: "27430 LAMPADA LED EMPALUX E27 9W 127V - 220V 6500K BRANCA NÃO DIMERIZAVEL", value: "11", f: 810, P: 9 },
            { name: "380739 LAMPADA LED E27 11W 220-240V 6500K IP66 DIMERIZAVEL – SM", value: "12", f: 1018, P: 11 },
            { name: "380741 LAMPADA LED E27 15W 220-240V 2700K IP66 DIMERIZAVEL – SM", value: "13", f: 1507, P: 15 },
            { name: "382277 LAMPADA LED METALED E27 9W 220-240V 6500K BRANCA IP20 DIMERIZAVEL", value: "14", f: 1020, P: 9 }
        ];
        
        // Inclui itens no menu dropdown
        const lumSelect = document.getElementById('field16');
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.value;
            option.textContent = product.name;
            lumSelect.appendChild(option);
        });        

        // Verifica caso tenha alteração no menu drop down
        lumSelect.addEventListener('change', function() {
        const selectedProduct = products.find(p => p.value === lumSelect.value);
        if (selectedProduct) {
            field11.placeholder = selectedProduct.f + ' lúmens';
            field12.placeholder = selectedProduct.P + ' Watts';
        } else {
            field11.placeholder = "lúmens";
            field12.placeholder = "Watts";
        }
        });

        // Cria-se o canvases
        const buildingCanvas = document.getElementById('buildingCanvas');
        const illuminanceScaleCanvas = document.getElementById('illuminanceScale');



    // Roteiro de eventos após pressionar o botão "Calcular" //
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const afterSubmitDiv = document.getElementById('afterSubmitItems');
        afterSubmitDiv.style.display = "block";
        
        // Menu ratio (bolinhas) - Teto
        const field5Value = document.querySelector('input[name="field5"]:checked').value;
        const field5Map = {
            optionA: 0.7,
            optionB: 0.5,
            optionC: 0.3,
            optionD: 0
        };
        const field5 = field5Map[field5Value];

        // Menu ratio (bolinhas) - Parede
        const field6Value = document.querySelector('input[name="field6"]:checked').value;
        const field6Map = {
            optionA: 0.5,
            optionB: 0.3,
            optionC: 0.1,
            optionD: 0
        };
        const field6 = field6Map[field6Value];

        // Menu ratio (bolinhas) - Piso - Default
        let field7;
        if (field5 === 0 && field6 === 0) {
            field7 = 0;
        } else {
            field7 = 0.1;
        }

        // Fator de reflexão do piso (default to 0.8 - Médio)
        const field8 = 0.8; 


        // Pega os valores inseridos no frontend HTML
        const field1 = document.getElementById('field1').value; //Comprimento
        const field2 = document.getElementById('field2').value; //Largura
        const field3 = document.getElementById('field3').value; //Altura
        const field4 = document.getElementById('field4').value; //Altura Alvo
        const field9 = document.getElementById('field9').value; //Luminosidade Alvo
        const field10 = 1; //Lampadas por Luminária (default 1) - Campo excluido do front
        const field11 = document.getElementById('field11').value; //Fluxo Luminoso por lâmpada
        const field12 = document.getElementById('field12').value; //Potência por lâmpada

        // Campos opcionais (com valores default)
        let Q_fileiras_default = 5; // Defina um valor padrão inicial
        if (field2 < 10) {
            Q_fileiras_default = 2;
        } 
        else if (field2 >= 10 && field2 < 15) {
            Q_fileiras_default = 3;
        } 
        else if (field2 >= 15 && field2 < 20) {
            Q_fileiras_default = 4;
        } 
        else if (field2 >= 20 && field2 < 25) {
            Q_fileiras_default = 5;
        } 
        else if (field2 >= 25 && field2 < 30) {
            Q_fileiras_default = 6;
        } 
        else if (field2 >= 30) {
            Q_fileiras_default = 6;
        } 
        else {
            Q_fileiras_default = 0;
        }

        // Atualize o placeholder do field14 conforme o valor de Q_fileiras_default
        document.getElementById('field14').placeholder = Q_fileiras_default + ' fileiras (Padrão para o Comprimento inserido)';

        let field13 = 24; // Tempo ligado por dia (default 24 - field13 excluido do frontend)
        let field14 = document.getElementById('field14').value || Q_fileiras_default; // Fileiras de luminárias (default 5)
        let field15 = document.getElementById('field15').value || 0.3; // Altura da lâmpada ao teto (default 0,30)
        const field16 = 0; // Declara variavel do dropdown de lâmpadas

        const H = parseFloat(field3) - parseFloat(field4) - parseFloat(field15); //Pé direito - Altura da lampada ao teto - Altura de medição
        const K = (parseFloat(field1) * parseFloat(field2)) / (H * (parseFloat(field1) + parseFloat(field2))); //1 - Índice do local (K)
        
        // 2 - Fator de Utilização (U) - Processamento de Tabela de dados
        if (K < 0.80) {
            if (field5 == 0.7 && field6 == 0.5 && field7 == 0.1) {U = 0.40;}
            else if (field5 == 0.7 && field6 == 0.3 && field7 == 0.1) {U = 0.35;}
            else if (field5 == 0.7 && field6 == 0.1 && field7 == 0.1) {U = 0.32;}

            else if (field5 == 0.5 && field6 == 0.5 && field7 == 0.1) {U = 0.40;}
            else if (field5 == 0.5 && field6 == 0.3 && field7 == 0.1) {U = 0.35;}
            else if (field5 == 0.5 && field6 == 0.1 && field7 == 0.1) {U = 0.32;}

            else if (field5 == 0.3 && field6 == 0.3 && field7 == 0.1) {U = 0.35;}
            else if (field5 == 0.3 && field6 == 0.1 && field7 == 0.1) {U = 0.32;}
            else if (field5 == 0.0 && field6 == 0.0 && field7 == 0.0) {U = 0.30;}

            else {U = 0;}
        }
        else if (K < 1.00 && K >= 0.80) {
            if (field5 == 0.7 && field6 == 0.5 && field7 == 0.1) {U = 0.48;}
            else if (field5 == 0.7 && field6 == 0.3 && field7 == 0.1) {U = 0.43;}
            else if (field5 == 0.7 && field6 == 0.1 && field7 == 0.1) {U = 0.39;}

            else if (field5 == 0.5 && field6 == 0.5 && field7 == 0.1) {U = 0.47;}
            else if (field5 == 0.5 && field6 == 0.3 && field7 == 0.1) {U = 0.42;}
            else if (field5 == 0.5 && field6 == 0.1 && field7 == 0.1) {U = 0.39;}

            else if (field5 == 0.3 && field6 == 0.3 && field7 == 0.1) {U = 0.42;}
            else if (field5 == 0.3 && field6 == 0.1 && field7 == 0.1) {U = 0.39;}
            else if (field5 == 0.0 && field6 == 0.0 && field7 == 0.0) {U = 0.37;}

            else {U = 0;}
        }
        else if (K < 1.25 && K >= 1.00) {
            if (field5 == 0.7 && field6 == 0.5 && field7 == 0.1) {U = 0.53;}
            else if (field5 == 0.7 && field6 == 0.3 && field7 == 0.1) {U = 0.49;}
            else if (field5 == 0.7 && field6 == 0.1 && field7 == 0.1) {U = 0.45;}

            else if (field5 == 0.5 && field6 == 0.5 && field7 == 0.1) {U = 0.52;}
            else if (field5 == 0.5 && field6 == 0.3 && field7 == 0.1) {U = 0.48;}
            else if (field5 == 0.5 && field6 == 0.1 && field7 == 0.1) {U = 0.45;}

            else if (field5 == 0.3 && field6 == 0.3 && field7 == 0.1) {U = 0.48;}
            else if (field5 == 0.3 && field6 == 0.1 && field7 == 0.1) {U = 0.45;}
            else if (field5 == 0.0 && field6 == 0.0 && field7 == 0.0) {U = 0.43;}

            else {U = 0;}
        }
        else if (K < 1.5 && K >= 1.25) {
            if (field5 == 0.7 && field6 == 0.5 && field7 == 0.1) {U = 0.58;}
            else if (field5 == 0.7 && field6 == 0.3 && field7 == 0.1) {U = 0.54;}
            else if (field5 == 0.7 && field6 == 0.1 && field7 == 0.1) {U = 0.51;}

            else if (field5 == 0.5 && field6 == 0.5 && field7 == 0.1) {U = 0.57;}
            else if (field5 == 0.5 && field6 == 0.3 && field7 == 0.1) {U = 0.53;}
            else if (field5 == 0.5 && field6 == 0.1 && field7 == 0.1) {U = 0.50;}

            else if (field5 == 0.3 && field6 == 0.3 && field7 == 0.1) {U = 0.53;}
            else if (field5 == 0.3 && field6 == 0.1 && field7 == 0.1) {U = 0.50;}
            else if (field5 == 0.0 && field6 == 0.0 && field7 == 0.0) {U = 0.48;}

            else {U = 0;}
        }
        else if (K < 2 && K >= 1.5) {
            if (field5 == 0.7 && field6 == 0.5 && field7 == 0.1) {U = 0.62;}
            else if (field5 == 0.7 && field6 == 0.3 && field7 == 0.1) {U = 0.58;}
            else if (field5 == 0.7 && field6 == 0.1 && field7 == 0.1) {U = 0.55;}

            else if (field5 == 0.5 && field6 == 0.5 && field7 == 0.1) {U = 0.61;}
            else if (field5 == 0.5 && field6 == 0.3 && field7 == 0.1) {U = 0.57;}
            else if (field5 == 0.5 && field6 == 0.1 && field7 == 0.1) {U = 0.54;}

            else if (field5 == 0.3 && field6 == 0.3 && field7 == 0.1) {U = 0.56;}
            else if (field5 == 0.3 && field6 == 0.1 && field7 == 0.1) {U = 0.54;}
            else if (field5 == 0.0 && field6 == 0.0 && field7 == 0.0) {U = 0.52;}

            else {U = 0;}
        }
        else if (K < 2.5 && K >= 2) {
            if (field5 == 0.7 && field6 == 0.5 && field7 == 0.1) {U = 0.67;}
            else if (field5 == 0.7 && field6 == 0.3 && field7 == 0.1) {U = 0.64;}
            else if (field5 == 0.7 && field6 == 0.1 && field7 == 0.1) {U = 0.61;}

            else if (field5 == 0.5 && field6 == 0.5 && field7 == 0.1) {U = 0.66;}
            else if (field5 == 0.5 && field6 == 0.3 && field7 == 0.1) {U = 0.63;}
            else if (field5 == 0.5 && field6 == 0.1 && field7 == 0.1) {U = 0.61;}

            else if (field5 == 0.3 && field6 == 0.3 && field7 == 0.1) {U = 0.62;}
            else if (field5 == 0.3 && field6 == 0.1 && field7 == 0.1) {U = 0.6;}
            else if (field5 == 0.0 && field6 == 0.0 && field7 == 0.0) {U = 0.58;}

            else {U = 0;}
        }
        else if (K < 3 && K >= 2.5) {
            if (field5 == 0.7 && field6 == 0.5 && field7 == 0.1) {U = 0.7;}
            else if (field5 == 0.7 && field6 == 0.3 && field7 == 0.1) {U = 0.68;}
            else if (field5 == 0.7 && field6 == 0.1 && field7 == 0.1) {U = 0.65;}

            else if (field5 == 0.5 && field6 == 0.5 && field7 == 0.1) {U = 0.69;}
            else if (field5 == 0.5 && field6 == 0.3 && field7 == 0.1) {U = 0.66;}
            else if (field5 == 0.5 && field6 == 0.1 && field7 == 0.1) {U = 0.64;}

            else if (field5 == 0.3 && field6 == 0.3 && field7 == 0.1) {U = 0.65;}
            else if (field5 == 0.3 && field6 == 0.1 && field7 == 0.1) {U = 0.64;}
            else if (field5 == 0.0 && field6 == 0.0 && field7 == 0.0) {U = 0.62;}

            else {U = 0;}
        }
        else if (K < 4 && K >= 3) {
            if (field5 == 0.7 && field6 == 0.5 && field7 == 0.1) {U = 0.72;}
            else if (field5 == 0.7 && field6 == 0.3 && field7 == 0.1) {U = 0.7;}
            else if (field5 == 0.7 && field6 == 0.1 && field7 == 0.1) {U = 0.68;}

            else if (field5 == 0.5 && field6 == 0.5 && field7 == 0.1) {U = 0.71;}
            else if (field5 == 0.5 && field6 == 0.3 && field7 == 0.1) {U = 0.69;}
            else if (field5 == 0.5 && field6 == 0.1 && field7 == 0.1) {U = 0.67;}

            else if (field5 == 0.3 && field6 == 0.3 && field7 == 0.1) {U = 0.68;}
            else if (field5 == 0.3 && field6 == 0.1 && field7 == 0.1) {U = 0.66;}
            else if (field5 == 0.0 && field6 == 0.0 && field7 == 0.0) {U = 0.64;}

            else {U = 0;}
        }
        else if (K < 5 && K >= 4) {
            if (field5 == 0.7 && field6 == 0.5 && field7 == 0.1) {U = 0.75;}
            else if (field5 == 0.7 && field6 == 0.3 && field7 == 0.1) {U = 0.73;}
            else if (field5 == 0.7 && field6 == 0.1 && field7 == 0.1) {U = 0.71;}

            else if (field5 == 0.5 && field6 == 0.5 && field7 == 0.1) {U = 0.73;}
            else if (field5 == 0.5 && field6 == 0.3 && field7 == 0.1) {U = 0.72;}
            else if (field5 == 0.5 && field6 == 0.1 && field7 == 0.1) {U = 0.7;}

            else if (field5 == 0.3 && field6 == 0.3 && field7 == 0.1) {U = 0.7;}
            else if (field5 == 0.3 && field6 == 0.1 && field7 == 0.1) {U = 0.69;}
            else if (field5 == 0.0 && field6 == 0.0 && field7 == 0.0) {U = 0.67;}

            else {U = 0;}
        }
        else if (K >= 5) {
            if (field5 == 0.7 && field6 == 0.5 && field7 == 0.1) {U = 0.76;}
            else if (field5 == 0.7 && field6 == 0.3 && field7 == 0.1) {U = 0.74;}
            else if (field5 == 0.7 && field6 == 0.1 && field7 == 0.1) {U = 0.73;}

            else if (field5 == 0.5 && field6 == 0.5 && field7 == 0.1) {U = 0.75;}
            else if (field5 == 0.5 && field6 == 0.3 && field7 == 0.1) {U = 0.73;}
            else if (field5 == 0.5 && field6 == 0.1 && field7 == 0.1) {U = 0.72;}

            else if (field5 == 0.3 && field6 == 0.3 && field7 == 0.1) {U = 0.72;}
            else if (field5 == 0.3 && field6 == 0.1 && field7 == 0.1) {U = 0.71;}
            else if (field5 == 0.0 && field6 == 0.0 && field7 == 0.0) {U = 0.69;}
            
            else {U = 0;}
        }
        else {
            U = 0; 
        }

        // Insere as variáveis inseridas nos fields do frontend em variáveis para os cálculos
        const E = parseFloat(field9); // Níveis de iluminância desejada (lux)
        const n = parseFloat(field10); // Quantidade de lâmpadas por luminária        
        const C = parseFloat(field1); // COMPRIMENTO DO AMBIENTE
        const L = parseFloat(field2); // LARGURA DO AMBIENTE
        const Fpl = parseFloat(field8); //Fator de perdas luminosas (PADRÃO SUJO)

        // Pega o valor do menu de dropdown (escolha da lâmpada)
        const field16Value = document.getElementById('field16').value;
        const selectedProduct = products.find(p => p.value === field16Value);

        // Pega os valores específicos da lâmpada escolhida pelo usuário
        let f, P;
        if (selectedProduct) {
            f = selectedProduct.f;
            P = selectedProduct.P;
        } else {
            // Caso o usuário queira adicionar uma lâmpada fora do menu (input manual)
            f = parseFloat(field11); 
            P = parseFloat(field12);
        }

        // Calculos do luminiotécnico
        const N_lamps = Math.ceil((E * C * L) / (U * n * f * Fpl)); //Número de Luminárias     
        const Em = ((N_lamps  * n * f * U * Fpl) / (C * L)); //Iluminância Média

        const P_inst = (N_lamps * P) / 1000; //Potência instalada

        const D_pot = (1000 * P_inst) / (C * L); //Densidade de Potência

        const Ton = 24;
        const C_est = P_inst * Ton * 30; //Consumo Estimado (kWh)

        Q_fileiras = parseFloat(field14)
        const Q_fileira = Math.ceil(N_lamps / Q_fileiras); //Quantidade/Fileira

        // Valor final de lampadas (arredondado para cima)
        N_lamps_final = Q_fileira *  Q_fileiras

        Dis_a = L / Q_fileiras;
        Dis_b = C / Q_fileira;

        // Vizualiza-se os resultados
        const formatNumber = num => Number(num).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
        if (f == null || P == null || isNaN(f) || isNaN(P)) {
            // Mostra um erro caso o usuário não preencha o fluxo lumino da lâmpada ou não selecione uma lâmpada
            resultDiv.innerHTML = `
                <div style="color: #dc3545; font-weight: bold; font-size: 1.2em; margin-bottom: 20px;">
                    Não foi possível calcular, verifique se uma lâmpada foi selecionada. Caso sua lâmpada
                    não esteja na lista, favor clicar no botão "editar" (✎) e preencher o fluxo luminoso e a
                    potência da mesma.
                </div>
            `;
        }
        else if (U == 0 || f == null || P == null || isNaN(f) || isNaN(P)){
            // Mostra um erro caso a combinação de itens não esteja correta
            resultDiv.innerHTML = `
                <div style="color: #dc3545; font-weight: bold; font-size: 1.2em; margin-bottom: 20px;">
                    A combinação de cores de lona escolhida não é comportada pela NBR 5413. 
                    Por favor selecione outra combinação de cores (caso não comporta a sua
                    combinação específica de cores, selecione a mais próxima possível).
                </div>
            `;
        } 
        else {
            resultDiv.innerHTML = `
                <ul>
                    <li><strong>Número de Luminárias:</strong> ${formatNumber(N_lamps_final)} luminárias</li>
                    <li><strong>Iluminância Média:</strong> ${formatNumber(Em)} lux</li>
                    <li><strong>Potência instalada:</strong> ${formatNumber(P_inst)} kW</li>
                    <li><strong>Densidade de Potência:</strong> ${formatNumber(D_pot)} W/m²</li>
                    <li><strong>Consumo Estimado:</strong> ${formatNumber(C_est)} kWh/mês</li>
                    <li><strong>Luminárias por fileira:</strong> ${formatNumber(Q_fileira)} luminárias/fileira</li>
                    <li><strong>Distância entre luminárias (a):</strong> ${formatNumber(Dis_a)} m (no comprimento)</li>
                    <li><strong>Distância entre luminárias (b):</strong> ${formatNumber(Dis_b)} m (no largura)</li>
                    <li><strong>Distância da luminária até a parede (a/2):</strong> ${formatNumber(Dis_a/2)} m (no comprimento)</li>
                    <li><strong>Distância da luminárias até a parede (b/2):</strong> ${formatNumber(Dis_b/2)} m (no largura)</li>
                </ul>
            `;
            downloadBtn.style.display = "inline-block";
        }

        // Scroll para os resultados
        resultDiv.scrollIntoView({ behavior: 'smooth' });          
    
    });

    // GERADOR DE PDF //
    downloadBtn.addEventListener('click', function() {
            fetch('https://api.ipify.org?format=json')
            .then(response => response.json())

        .then(data => {
            const ip = data.ip;

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // LOGOMARCA DA EMPRESA EM BASE 64 (para PDF) //
            const logoBase64 = 'data:image/jpeg;base64,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'; // your real Base64 string here
            
            // 1. Centraliza a logo no topo
            const pageWidth = doc.internal.pageSize.getWidth();
            const imgProps = doc.getImageProperties(logoBase64);
            const imgWidth = 50;
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
            const imgX = (pageWidth - imgWidth) / 2;
            doc.addImage(logoBase64, 'JPEG', imgX, 10, imgWidth, imgHeight);
            
            // 2. Titulo
            doc.setFontSize(16);
            doc.text("Resultado do Cálculo Luminotécnico", pageWidth / 2, imgHeight + 20, { align: "center" });
            
            // 3. Data e hora
            const now = new Date();
            const dateStr = now.toLocaleDateString('pt-BR');
            const timeStr = now.toLocaleTimeString('pt-BR');
            doc.setFontSize(10);
            doc.text(`Data: ${dateStr}   Hora: ${timeStr}`, pageWidth / 2, imgHeight + 28, { align: "center" });
            
            // 4. Resultados
            let y = imgHeight + 38;
            doc.setFontSize(12);

            // 5. Pega os valores de entrada do usuário
            const C = document.getElementById('field1').value;
            const L = document.getElementById('field2').value;
            const A = document.getElementById('field3').value;
            const alturaMedicao = document.getElementById('field4').value;
            const claridadeTeto = document.querySelector('input[name="field5"]:checked')?.nextSibling.textContent.trim() || '';
            const claridadeParede = document.querySelector('input[name="field6"]:checked')?.nextSibling.textContent.trim() || '';
            const claridadePiso = document.querySelector('input[name="field7"]:checked')?.nextSibling.textContent.trim() || '';
            const luxAlvo = document.getElementById('field9').value;
            const lampF = document.getElementById('field11').value || document.getElementById('field11').placeholder;
            const lampP = document.getElementById('field12').value || document.getElementById('field12').placeholder;
            const tempoUso = 24;
            const fileiras = document.getElementById('field14').value || 5;
            const alturaLampada = document.getElementById('field15').value || 0.3;

            // 5.1. Adiciona os valores de entrada ao PDF
            doc.text("Entradas do Usuário:", 15, y);
            y += 8;
            doc.setFontSize(11);
            doc.text(`Comprimento (C): ${C} m`, 15, y); y += 6;
            doc.text(`Largura (L): ${L} m`, 15, y); y += 6;
            doc.text(`Altura (A): ${A} m`, 15, y); y += 6;
            doc.text(`Altura de Medição: ${alturaMedicao} m`, 15, y); y += 6;
            doc.text(`Claridade do Teto: ${claridadeTeto}`, 15, y); y += 6;
            doc.text(`Claridade da Parede: ${claridadeParede}`, 15, y); y += 6;
            doc.text(`Claridade do Piso: ${claridadePiso}`, 15, y); y += 6;
            doc.text(`Luminosidade Alvo: ${luxAlvo} lux`, 15, y); y += 6;
            doc.text(`Fluxo por Lâmpada (f): ${lampF}`, 15, y); y += 6;
            doc.text(`Potência por Lâmpada (P): ${lampP}`, 15, y); y += 6;
            doc.text(`Tempo de Utilização Diário: ${tempoUso} h`, 15, y); y += 6;
            doc.text(`Fileiras de Luminárias: ${fileiras}`, 15, y); y += 6;
            doc.text(`Altura da Lâmpada ao Teto: ${alturaLampada} m`, 15, y); y += 10;

            // 6. Adiciona os resultados no PDF
            doc.setFontSize(12);
            doc.text("Resultados:", 15, y); y += 8;
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = resultDiv.innerHTML;
            const items = Array.from(tempDiv.querySelectorAll('li')).map(li => li.textContent);

            items.forEach(item => {
                doc.text(`• ${item}`, 15, y);
                y += 8;
                if (y > 280) {
                    doc.addPage();
                    y = 20;
                }
            });            

            y += 5;

            // 8. Adiciona-se o IP do usuário
            doc.setFontSize(8);
            const pageHeight = doc.internal.pageSize.getHeight();      
            doc.text(`Endereço IP público: ${ip}`, 15, pageHeight - 10);

            // 9. Salva o PDF (aqui define-se o nome do arquivo)
            doc.save("resultado_luminotecnico.pdf");
        });
    });

});



