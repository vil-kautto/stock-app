/**
 * SMAData is used to create object which hold SMA 5 data
 */
export class SMAData {
    /**
     * Date of given data range 
     */
    public date: any;
    
    /**
     *  5 day SMA value
     */
    public sma: any;
    
    /**
     * percentual change during the time frame
     */
    public change: any;
}