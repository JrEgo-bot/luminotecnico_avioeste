// JavaScript code to handle form submission and calculations

document.getElementById('calcForm').addEventListener('submit', function(event) {
    event.preventDefault();
});

   

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

        downloadBtn.addEventListener('click', function() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            const logoBase64 = 'data:image/jpeg;base64,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'; // your real Base64 string here

            // Centered logo at the top (width: 50, height: 30)
            const pageWidth = doc.internal.pageSize.getWidth();
            const imgProps = doc.getImageProperties(logoBase64);
            const imgWidth = 50;
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
            const imgX = (pageWidth - imgWidth) / 2;
            doc.addImage(logoBase64, 'JPEG', imgX, 10, imgWidth, imgHeight);

            // 2. Title
            doc.setFontSize(16);
            doc.text("Resultado do Cálculo Luminotécnico", pageWidth / 2, imgHeight + 20, { align: "center" });

            // 3. Date and time
            const now = new Date();
            const dateStr = now.toLocaleDateString('pt-BR');
            const timeStr = now.toLocaleTimeString('pt-BR');
            doc.setFontSize(10);
            doc.text(`Data: ${dateStr}   Hora: ${timeStr}`, pageWidth / 2, imgHeight + 28, { align: "center" });

            // 4. Results (format as plain text)
            let y = imgHeight + 38;
            doc.setFontSize(12);

            // Get results as text (strip HTML tags)
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = resultDiv.innerHTML;
            const items = Array.from(tempDiv.querySelectorAll('li')).map(li => li.textContent);

            items.forEach(item => {
                doc.text(`• ${item}`, 15, y);
                y += 8;
                if (y > 280) { // New page if needed
                    doc.addPage();
                    y = 20;
                }
            });

            doc.save("resultado_luminotecnico.pdf");
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

        if ((U == 0) || f == null || P == null || isNaN(f) || isNaN(P)) {
            resultDiv.innerHTML = `
                <div style="color: #dc3545; font-weight: bold; font-size: 1.2em; margin-bottom: 20px;">
                    Erro: Não foi possível determinar o Fator de Utilização (U), Fator de Luminância (f) ou Potência (P). 
                    Tente inserir outros valores.
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
            downloadBtn.style.display = "inline-block";
        }
        // Scroll to the result
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    });
});
