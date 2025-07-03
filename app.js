// JavaScript code to handle form submission and calculations

document.getElementById('calcForm').addEventListener('submit', function(event) {
    event.preventDefault();
});

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('calcForm').reset();
    document.getElementById('result').textContent = '';
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calcForm');
    const resultDiv = document.getElementById('result');

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

        const field8Value = document.querySelector('input[name="field8"]:checked').value;
        const field8Map = {   // Map radio value to output
            optionA: 0.8,
            optionB: 0.7,
            optionC: 0.6,
        };
        const field8 = field8Map[field8Value];


        // Gather input values
        const field1 = document.getElementById('field1').value; //Comprimento
        const field2 = document.getElementById('field2').value; //Largura
        const field3 = document.getElementById('field3').value; //Altura
        const field4 = document.getElementById('field4').value; //Altura Alvo
        const field9 = document.getElementById('field9').value; //Luminosidade Alvo
        const field10 = document.getElementById('field10').value; //Lampadas por Luminária
        const field11 = document.getElementById('field11').value; //Fluxo Luminoso por lâmpada
        const field12 = document.getElementById('field12').value; //Potência por lâmpada
        const field13 = document.getElementById('field13').value; //Utilização Diária
        const field14 = document.getElementById('field14').value; //Fileiras de Luminárias desejado
        const field15 = document.getElementById('field15').value; //Hs

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

        const E = parseFloat(field9);
        const n = parseFloat(field10);
        const f = parseFloat(field11);
        const C = parseFloat(field1);
        const L = parseFloat(field2);
        const Fpl = parseFloat(field8);

        // Perform calculations
        const N_lamps = Math.ceil((E * C * L) / (U * n * f * Fpl)); //Número de Luminárias     
        const Em = ((N_lamps  * n * f * U * Fpl) / (C * L)); //Iluminância Média

        const P = parseFloat(field12);
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
                    <li><strong>Distância entre luminárias:</strong> ${formatNumber(Dis_a)} m (no comprimento)</li>
                    <li><strong>Distância entre luminárias:</strong> ${formatNumber(Dis_b)} m (no largura)</li>
                    <li><strong>Distância da luminária até a parede:</strong> ${formatNumber(Dis_a/2)} m (no comprimento)</li>
                    <li><strong>Distância da luminárias até a parede:</strong> ${formatNumber(Dis_b/2)} m (no largura)</li>
                </ul>
            `;
        }
        // Scroll to the result
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    });
});