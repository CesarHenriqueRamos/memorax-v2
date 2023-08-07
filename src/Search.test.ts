import { Firestore, collection, query, where, getDocs } from 'firebase/firestore';
import { Search } from './functions/functions'; 

// Simule o Firestore e suas funções
const mockFirestore = {} as Firestore;
jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));

describe('Search function', () => {
  it('should return filtered data when matching title', async () => {
    const mockTitleData = [{ data: () => ({ title: 'testTitle' }), id: '1' }];
    const campoFiltrado = 'testTitle';

    // Simule o comportamento das funções
    (collection as jest.Mock).mockReturnValue(jest.fn());
    (query as jest.Mock).mockReturnValue(jest.fn());
    (where as jest.Mock).mockReturnValue(jest.fn());
    (getDocs as jest.Mock).mockResolvedValue({ docs: mockTitleData });

    const result = await Search(mockFirestore, campoFiltrado);

    expect(result).toEqual([{ title: 'testTitle', id: '1' }]);
    expect(collection).toHaveBeenCalledWith(mockFirestore, 'tasks');
    expect(query).toHaveBeenCalledTimes(2); 
    expect(where).toHaveBeenCalledTimes(2); 
    expect(getDocs).toHaveBeenCalledTimes(2); 
  });

  it('should return filtered data when matching name_user_create', async () => {
    const mockUserData = [{ data: () => ({ name_user_create: 'testUser' }), id: '2' }];
    const campoFiltrado = 'testUser';

    // Simule o comportamento das funções
    (collection as jest.Mock).mockReturnValue(jest.fn());
    (query as jest.Mock).mockReturnValue(jest.fn());
    (where as jest.Mock).mockReturnValue(jest.fn());
    (getDocs as jest.Mock).mockResolvedValue({ docs: mockUserData });

    const result = await Search(mockFirestore, campoFiltrado);

    expect(result).toEqual([{ name_user_create: 'testUser', id: '2' }]);
    expect(collection).toHaveBeenCalledWith(mockFirestore, 'tasks');
    expect(query).toHaveBeenCalledTimes(2); 
    expect(where).toHaveBeenCalledTimes(2); 
    expect(getDocs).toHaveBeenCalledTimes(2); 
  });

  it('should return empty array if no match', async () => {
    const campoFiltrado = 'nonExistent';

    // Simule o comportamento das funções
    (collection as jest.Mock).mockReturnValue(jest.fn());
    (query as jest.Mock).mockReturnValue(jest.fn());
    (where as jest.Mock).mockReturnValue(jest.fn());
    (getDocs as jest.Mock).mockResolvedValue({ docs: [] });

    const result = await Search(mockFirestore, campoFiltrado);

    expect(result).toEqual([]);
    expect(collection).toHaveBeenCalledWith(mockFirestore, 'tasks');
    expect(query).toHaveBeenCalledTimes(2); 
    expect(where).toHaveBeenCalledTimes(2); 
    expect(getDocs).toHaveBeenCalledTimes(2); 
  });

  it('should handle errors', async () => {
    const campoFiltrado = 'test';
  
    // Simule o comportamento das funções
    (collection as jest.Mock).mockReturnValue(jest.fn());
    (query as jest.Mock).mockReturnValue(jest.fn());
    (where as jest.Mock).mockReturnValue(jest.fn());
  
   
    (getDocs as jest.Mock).mockRejectedValue(new Error('Simulated error while fetching data'));
  
    try {
      await Search(mockFirestore, campoFiltrado);
      // Se a execução chegou aqui, deve lançar uma falha no teste
      expect(true).toBe(false); 
    } catch (error) {
      const errorInstance = error as Error; 
      expect(errorInstance.message).toBe('Simulated error while fetching data');
    }
  
    expect(collection).toHaveBeenCalledWith(mockFirestore, 'tasks');
    expect(query).toHaveBeenCalledTimes(1); 
    expect(where).toHaveBeenCalledTimes(1); 
    expect(getDocs).toHaveBeenCalledTimes(1);
  });
  
  
});
