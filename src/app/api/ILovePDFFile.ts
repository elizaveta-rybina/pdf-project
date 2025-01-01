import BaseFile, { BaseFileParams } from "@ilovepdf/ilovepdf-js-core/tasks/BaseFile";

export default class ILovePDFFile extends BaseFile {
    private file: File;

    constructor(file: File, params?: BaseFileParams) {
        if (!(file instanceof File)) {
            throw new Error("The provided file must be a valid File object.");
        }

        const filename = file.name;
        super('', '', filename, params);

        this.file = file;
    }

    get data(): FormData {
        const formData = new FormData();

        if (!this.taskId) {
            throw new Error("Task ID must be defined before accessing form data.");
        }

        formData.append('task', this.taskId);
        formData.append('file', this.file);

        if (this.info) {
            formData.append('pdfinfo', '1');
        }

        return formData;
    }
}
