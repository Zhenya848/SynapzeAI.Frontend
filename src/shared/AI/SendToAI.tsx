export async function sendToAI(request: string, filePath?: string) { 
    return await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'google/gemini-2.5-flash-lite',
            messages: [
                {
                    role: 'user',
                    content: (filePath && filePath.startsWith('data:image/')
                    ? 
                    [
                        {
                            type: 'text',
                            text: request,
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: filePath,
                            },
                        }
                    ]
                    : filePath && filePath.startsWith('data:application/pdf')
                    ?
                    [
                        {
                            type: 'text',
                            text: request,
                        },
                        {
                            type: 'file',
                            file: {
                                filename: 'document.pdf',
                                file_data: filePath,
                            },
                        },
                    ]
                    :
                    [
                        {
                            type: 'text',
                            text: request,
                        }
                    ])
                }
            ],

            plugins: [
                {
                    id: 'file-parser',
                    pdf: {
                        engine: 'mistral-ocr'
                    },
                },
            ]
        }),
    });
}