export class FileExtensions {
    static async encodeImageToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                if (e.target?.result) {
                    resolve(e.target.result as string);
                } else {
                    reject(new Error('Failed to read file'));
                }
            };
            
            reader.onerror = () => reject(new Error('File reading error'));
            reader.readAsDataURL(file);
        });
    }
}