import dayjs from 'dayjs';

/**
 * 日付関連のUtilityクラス
 */
export class DateUtil {
  /**
   * 日付を指定したフォーマットに変換する
   * @param date 日付
   * @param format 書式
   */
  public static formatDate(date: string, format: string): string {
    return dayjs(date).format(format);
  }
}
