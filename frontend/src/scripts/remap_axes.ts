import * as fs from 'fs';
import * as path from 'path';

const vata = 'vata_axis';
const pitta = 'pitta_axis';
const kapha = 'kapha_axis';
const agni = 'agni_axis';
const ojas = 'ojas_axis';

function mapEffect(key: string, value: number, vector: Record<string, number>) {
    switch(key) {
        case 'vata': vector[vata] = (vector[vata] || 0) + value; break;
        case 'pitta': vector[pitta] = (vector[pitta] || 0) + value; break;
        case 'kapha': vector[kapha] = (vector[kapha] || 0) + value; break;
        case 'agni': vector[agni] = (vector[agni] || 0) + value; break;
        case 'ojas': vector[ojas] = (vector[ojas] || 0) + value; break;
        case 'stress': 
            vector[vata] = (vector[vata] || 0) + value * 0.7;
            vector[pitta] = (vector[pitta] || 0) + value * 0.3;
            break;
        case 'sleep':
            vector[vata] = (vector[vata] || 0) - value * 0.5;
            vector[ojas] = (vector[ojas] || 0) + value * 0.5;
            break;
        case 'circadian':
            vector[vata] = (vector[vata] || 0) - value * 0.5;
            vector[ojas] = (vector[ojas] || 0) + value * 0.5;
            break;
        case 'digestion':
        case 'appetite':
            vector[agni] = (vector[agni] || 0) + value; break;
        case 'bloating':
            vector[vata] = (vector[vata] || 0) + value * 0.6;
            vector[agni] = (vector[agni] || 0) - value * 0.4;
            break;
        case 'elimination':
            vector[vata] = (vector[vata] || 0) - value * 0.5;
            vector[agni] = (vector[agni] || 0) + value * 0.5;
            break;
        case 'energy':
        case 'cognitive_energy':
            vector[ojas] = (vector[ojas] || 0) + value * 0.5;
            vector[agni] = (vector[agni] || 0) + value * 0.5;
            break;
        case 'mood':
            vector[ojas] = (vector[ojas] || 0) + value * 0.4;
            vector[pitta] = (vector[pitta] || 0) - value * 0.3;
            vector[vata] = (vector[vata] || 0) - value * 0.3;
            break;
        case 'immunity':
            vector[ojas] = (vector[ojas] || 0) + value; break;
        case 'inflammation':
            vector[pitta] = (vector[pitta] || 0) + value; break;
        case 'stiffness':
            vector[kapha] = (vector[kapha] || 0) + value * 0.6;
            vector[vata] = (vector[vata] || 0) + value * 0.4;
            break;
        case 'movement':
            vector[kapha] = (vector[kapha] || 0) - value * 0.5;
            vector[vata] = (vector[vata] || 0) - value * 0.5;
            break;
        case 'hydration':
            vector[kapha] = (vector[kapha] || 0) + value * 0.5;
            vector[vata] = (vector[vata] || 0) - value * 0.5;
            break;
        case 'skin_health':
        case 'hair_health':
            vector[ojas] = (vector[ojas] || 0) + value * 0.5;
            vector[pitta] = (vector[pitta] || 0) - value * 0.5;
            break;
        case 'mental_clarity':
            vector[ojas] = (vector[ojas] || 0) + value * 0.4;
            vector[vata] = (vector[vata] || 0) - value * 0.6;
            break;
        case 'irritability':
            vector[pitta] = (vector[pitta] || 0) + value * 0.7;
            vector[vata] = (vector[vata] || 0) + value * 0.3;
            break;
        case 'attention_stability':
            vector[vata] = (vector[vata] || 0) - value * 0.8;
            vector[ojas] = (vector[ojas] || 0) + value * 0.2;
            break;
        case 'social_balance':
            vector[ojas] = (vector[ojas] || 0) + value * 0.5;
            vector[pitta] = (vector[pitta] || 0) - value * 0.5;
            break;
        case 'ama':
            vector[agni] = (vector[agni] || 0) - value * 0.7;
            vector[kapha] = (vector[kapha] || 0) + value * 0.3;
            break;
            
        case 'vata_axis': vector[vata] = (vector[vata] || 0) + value; break;
        case 'pitta_axis': vector[pitta] = (vector[pitta] || 0) + value; break;
        case 'kapha_axis': vector[kapha] = (vector[kapha] || 0) + value; break;
        case 'agni_axis': vector[agni] = (vector[agni] || 0) + value; break;
        case 'ojas_axis': vector[ojas] = (vector[ojas] || 0) + value; break;
    }
}

function processSignals(filePath: string) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    for (const [key, item] of Object.entries(data)) {
        const i = item as any;
        const newEffects: Record<string, number> = {};
        if (i.effects) {
            for (const [v, val] of Object.entries(i.effects)) {
                mapEffect(v, val as number, newEffects);
            }
        }
        for (const k in newEffects) {
            newEffects[k] = Math.round(newEffects[k] * 10) / 10;
            if (newEffects[k] === 0) delete newEffects[k];
        }
        i.effects = newEffects;
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${filePath}`);
}

function processProtocols(filePath: string) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    for (const item of data) {
        const newVars: Record<string, number> = {};
        if (item.variables) {
            for (const [v, val] of Object.entries(item.variables)) {
                mapEffect(v, val as number, newVars);
            }
        }
        for (const k in newVars) {
            newVars[k] = Math.round(newVars[k] * 10) / 10;
            if (newVars[k] === 0) delete newVars[k];
        }
        item.variables = newVars;
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    console.log(`Updated ${filePath}`);
}

const signalsPath = path.join(__dirname, '../data/signals.json');
const protocolsPath = path.join(__dirname, '../data/protocols.json');

processSignals(signalsPath);
processProtocols(protocolsPath);
