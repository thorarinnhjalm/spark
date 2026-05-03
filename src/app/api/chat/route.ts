import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { missionsData } from '@/lib/missionsData';

// Pössum upp á að nota server-side environment breytuna
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { missionId, history, message } = body;

    if (!missionId || !message) {
      return NextResponse.json({ error: 'Missing missionId or message' }, { status: 400 });
    }

    // Sækja rétta missionið úr gögnunum
    const mission = missionsData.find(m => m.missionId === missionId);
    if (!mission) {
      return NextResponse.json({ error: 'Mission not found' }, { status: 404 });
    }

    // Sækja System Prompt fyrir þennan fasa (Lab Phase)
    const systemPrompt = mission.phases.lab.systemPrompt;

    // Setja upp söguna fyrir Gemini
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }
    
    // Bæta nýjasta skilaboðinu við
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Kalla í Gemini 3.1 Flash með Spark Prompt Layer
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash',
      contents: contents,
      config: {
        systemInstruction: `You are Spark, an AI assistant in a children's learning game (ages 10-14). 
Speak in Icelandic. Be friendly, encouraging, and brief. 
Mission context: ${systemPrompt}`,
        temperature: 0.7,
      }
    });

    const replyText = response.text || 'Gat ekki svarað. Prófaðu aftur!';

    return NextResponse.json({ reply: replyText });
  } catch (error: unknown) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
