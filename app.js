// JavaScript code to handle form submission and calculations

document.getElementById('calcForm').addEventListener('submit', function(event) {
    event.preventDefault();
});

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('calcForm').reset();

    field11.disabled = true;
        field12.disabled = true;
        field16.disabled = false;
        field16.value = ''; // Clear the dropdown selection
        option.value = '';
    document.getElementById('result').textContent = '';
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calcForm');
    const resultDiv = document.getElementById('result');
    
    const editLampBtn = document.getElementById('editLampBtn');
    editLampBtn.addEventListener('click', function() {
        field11.disabled = false;
        field12.disabled = false;
        field16.disabled = true;
        field16.value = ''; // Clear the dropdown selection
        // Reset placeholders to default
        field11.placeholder = "lúmens";
        field12.placeholder = "Watts";

        editLampBtn.disabled = true; // Optional: disable the button after click
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
        // Populate the dropdown
        const lumSelect = document.getElementById('field16');
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.value;
            option.textContent = product.name;
            lumSelect.appendChild(option);
        });        

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


    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get selected radio value
        const field5Value = document.querySelector('input[name="field5"]:checked').value;
        const field5Map = {   // Map radio value to output
            optionA: 0.7,
            optionB: 0.5,
            optionC: 0.3,
            optionD: 0.1,
            optionE: 0
        };
        const field5 = field5Map[field5Value];

        const field6Value = document.querySelector('input[name="field6"]:checked').value;
        const field6Map = {   // Map radio value to output
            optionA: 0.5,
            optionB: 0.3,
            optionC: 0.1,
            optionD: 0
        };
        const field6 = field6Map[field6Value];

        const field7Value = document.querySelector('input[name="field7"]:checked').value;
        const field7Map = {   // Map radio value to output
            optionA: 0.1,
            optionB: 0
        };
        const field7 = field7Map[field7Value];

        const field8 = 0.6; // Fator de reflexão do piso (default to 0.6)


        // Gather input values
        const field1 = document.getElementById('field1').value; //Comprimento
        const field2 = document.getElementById('field2').value; //Largura
        const field3 = document.getElementById('field3').value; //Altura
        const field4 = document.getElementById('field4').value; //Altura Alvo
        const field9 = document.getElementById('field9').value; //Luminosidade Alvo
        const field10 = 1; //Lampadas por Luminária (default to 1)
        const field11 = document.getElementById('field11').value; //Fluxo Luminoso por lâmpada
        const field12 = document.getElementById('field12').value; //Potência por lâmpada

        let field13 = document.getElementById('field13').value || 24;
        let field14 = document.getElementById('field14').value || 5;
        let field15 = document.getElementById('field15').value || 0.3;
        const field16 = 0; 

        const H = parseFloat(field3) - parseFloat(field4) - parseFloat(field15); //Pé direito - Altura da lampada ao teto - Altura de medição
        const K = (parseFloat(field1) * parseFloat(field2)) / (H * (parseFloat(field1) + parseFloat(field2))); //1 - Índice do local (K)
        
        //2 - Fator de Utilização (U)
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

        const E = parseFloat(field9); // Níveis de iluminância desejada (lux)
        const n = parseFloat(field10); // Quantidade de lâmpadas por luminária        
        const C = parseFloat(field1); // COMPRIMENTO DO AMBIENTE
        const L = parseFloat(field2); // LARGURA DO AMBIENTE
        const Fpl = parseFloat(field8); //Fator de perdas luminosas (PADRÃO SUJO)

        const field16Value = document.getElementById('field16').value;
        const selectedProduct = products.find(p => p.value === field16Value);

        let f, P;
        if (selectedProduct) {
            f = selectedProduct.f;
            P = selectedProduct.P;
        } else {
            f = parseFloat(field11); // fallback to manual input
            P = parseFloat(field12);
        }

        // Perform calculations
        const N_lamps = Math.ceil((E * C * L) / (U * n * f * Fpl)); //Número de Luminárias     
        const Em = ((N_lamps  * n * f * U * Fpl) / (C * L)); //Iluminância Média

        const P_inst = (N_lamps * P) / 1000; //Potência instalada

        const D_pot = (1000 * P_inst) / (C * L); //Densidade de Potência

        const Ton = parseFloat(field13);
        const C_est = P_inst * Ton * 30; //Consumo Estimado (kWh)

        Q_fileiras = parseFloat(field14)
        const Q_fileira = Math.ceil(N_lamps / Q_fileiras); //Quantidade/Fileira

        // Valor final de lampadas (arredondado para cima)
        N_lamps_final = Q_fileira *  Q_fileiras

        Dis_a = L / Q_fileiras;
        Dis_b = C / Q_fileira;

        // Display result
        const formatNumber = num => Number(num).toLocaleString('pt-BR', { maximumFractionDigits: 2 });

        if (U === 0) {
            resultDiv.innerHTML = `
                <div style="color: #dc3545; font-weight: bold; font-size: 1.2em; margin-bottom: 20px;">
                    Erro: Não foi possível determinar o Fator de Utilização (U). Tente inserir outro valor de Claridade de Ambiente.
                </div>
            `;
        } else {
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
        }
        // Scroll to the result
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    });
});
