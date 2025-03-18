export const useAutoGenerateAlisas = (name: string): string => {
    return name
      .toLowerCase()                   
      .trim()                          
      .normalize("NFD")                
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^a-z0-9\s-]/g, "")   
      .replace(/\s+/g, "-");           
  };