import { clearFiles } from 'app/store/slices/pdfSlice'
import { RootState } from 'app/store/store'
import { saveAs } from 'file-saver'
import { useDispatch, useSelector } from 'react-redux'

export const MergeButton = () => {
  const files = useSelector((state: RootState) => state.pdf.files || []);
  const task = useSelector((state: RootState) => state.pdf.task); // Извлекаем задачу из Redux
  const dispatch = useDispatch();

  const handleMerge = async (): Promise<void> => {
    if (files.length < 2) {
      alert('Загрузите хотя бы два файла для объединения.');
      return;
    }

    if (!task) {
      alert('Задача не создана.');
      return;
    }

    try {
      console.log(task);
      await task.process();  // Обрабатываем задачу

      const result = await task.download();
      saveAs(new Blob([result]), 'merged_file.pdf');

      alert('Файл успешно объединён и скачан!');
      dispatch(clearFiles()); // Очищаем файлы и задачу
    } catch (error) {
      console.error('Ошибка при объединении файлов:', error);
      alert('Не удалось объединить файлы. Попробуйте снова.');
    }
  };

  return (
    <button onClick={handleMerge}>
      Объединить PDF
    </button>
  );
};
