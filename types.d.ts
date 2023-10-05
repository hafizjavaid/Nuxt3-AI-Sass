
export type ChatCompletionRequestMessage = {
    role: 'user' | 'assistant';
    content: string;
}
export type AudioResponse = {
    audio: string;
    spectrogram: string;
}