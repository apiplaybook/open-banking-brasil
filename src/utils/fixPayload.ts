// @ts-nocheck
export const fixPayload = (payload) => {
	let types = []
	let lastBrand = false
	let fixedBrand = []
	let fixedType = []
	Object.keys(types).forEach((typeIndex) => {
		types[typeIndex].forEach((brand, brandIndex) => {
			if (lastBrand === false) {
				lastBrand = brand
				if (types[typeIndex].length === brandIndex + 1) {
					types[typeIndex] = [brand]
					lastBrand = false
				}
			} else {
				if (brand.brand === lastBrand.brand && brand.company === lastBrand.company) {
					fixedBrand.push(omit('company', omit('brand', lastBrand))[0])
					lastBrand = brand
				} else {
					if (fixedBrand.length > 0) {
						fixedBrand = {
							...fixedBrand,
							brand: lastBrand.brand,
							company: lastBrand.company,
						}

						fixedType.push(fixedBrand)
					}
					fixedType.push(brand)
				}
			}
			if (types[typeIndex].length === brandIndex + 1) {
				types[typeIndex] = fixedType
				fixedType = []
				lastBrand = false
			}
		})
	})
	return types
}
