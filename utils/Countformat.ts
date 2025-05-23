function formatCount(value  : number=0):string {
	if ( value > 100000000) {
		value/=100000000
		return value.toFixed(1) + '亿'
	}
	else if (value >= 10000) {
		value /= 10000
		return value.toFixed(1) + '万'
	} else {
		return value.toString()
	}
}
export default  formatCount
export function joinArtistNames(
  artists: { name: string }[],
  separator: string = " / "
): string {
  // 使用 map 提取 name 属性并过滤无效值（网页3[3](@ref)、网页4[4](@ref)）
  const validNames = artists
    .map(artist => artist?.name?.trim()) // 提取并去除首尾空格
    .filter(name => name && name.length > 0); // 过滤空值（网页8[8](@ref)）

  // 使用 join 方法高效拼接（网页6[6](@ref)、网页7[7](@ref)）
  return validNames.join(separator);
}
export function formatTimestampToDate(
  timestamp: number,
  separator: string = '-'
): string {
  const date = new Date(timestamp);
  
  // 获取年月日并补零
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  // 拼接结果
  return [year, month, day].join(separator);
}