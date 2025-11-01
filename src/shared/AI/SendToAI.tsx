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