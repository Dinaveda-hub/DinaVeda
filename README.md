# Veda AI

Veda AI is the preventive wellness intelligence for the Dinaveda platform, built upon the Swasthavritta foundation from the Brihat Trayi.

## Architecture
- **Frontend**: Next.js (React)
- **Backend**: FastAPI (Python)
- **ML Module**: CatBoost for Prakriti prediction (Local training, Backend inference)

## Intelligence Architecture
1. **Prakriti Assessment**: CatBoost ML Model (Probabilities)
2. **Baseline Initialization**: Vata/Pitta/Kapha thermodynamic scoring
3. **Deterministic Engine**: Signal processing from real-time logs
4. **Protocol Engine**: Recommendation logic
5. **Simulation**: Health path projections

## Guidelines
- **ML Deployment**: Training occurs locally; only the serialized `.pkl` model and prediction service are deployed to production.
- The intelligence follows strict mandatory safety protocols: it never diagnoses disease or prescribes herbal dosages.
- It always prioritizes dietary (Ahara) and lifestyle (Vihara) interventions.
