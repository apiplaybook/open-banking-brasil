// Omite uma propriedade em um objeto
export const omit = (key: string, obj: any) => {
	const { [key]: omitted, ...rest } = obj
	return rest
}
