import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFViewer,
} from '@react-pdf/renderer';
import backgroundImage from '../../assets/blank.png';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  text: {
    fontSize: 10,
  },
});

// Create Document Component
const PdfView = ({ admission_Data, tc_Issue_Master_Data }) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={{ backgroundImage: backgroundImage }}>
        <Image
          src={backgroundImage}
          style={{ width: '100%', height: '100%' }}
        />
      </View>

      <Text
        style={{
          top: '10px',
          marginHorizontal: 'auto',
          justifyContent: 'center',
          left: '0px',
          right: '0px',
          textAlign: 'center',
          color: 'green',
          fontStyle: 'Italic',
          fontWeight: 'bold',
          fontSize: '20px',
          position: 'absolute',
        }}
      >
        {admission_Data?.admitno}
      </Text>
      <Text
        style={{
          top: '30px',
          justifyContent: 'center',
          left: '0px',
          right: '0px',
          textAlign: 'center',
          fontSize: '15px',
          position: 'absolute',
        }}
      >
        {admission_Data?.stud_name}
      </Text>
      <Text
        style={{
          top: '60px',
          marginHorizontal: 'auto',
          justifyContent: 'center',
          left: '0px',
          right: '0px',
          textAlign: 'center',
          fontSize: '10px',
          position: 'absolute',
        }}
      >
        {admission_Data?.sex_mf}
      </Text>
      <Text
        style={{
          top: '70px',
          marginHorizontal: 'auto',
          justifyContent: 'center',
          left: '0px',
          right: '0px',
          textAlign: 'center',
          fontSize: '10px',
          position: 'absolute',
        }}
      >
        {admission_Data?.curr_class}
      </Text>
      <Text
        style={{
          top: '80px',
          marginHorizontal: 'auto',
          justifyContent: 'center',
          left: '0px',
          right: '0px',
          textAlign: 'center',
          color: 'blue',
          fontSize: '15px',
          position: 'absolute',
        }}
      >
        {admission_Data?.curr_sec}
      </Text>

      <Text style={{ top: '85px', left: '80px', ...styles.text }}>
        {admission_Data?.f_name}
      </Text>

      <Text style={{ top: '145px', left: '150px', ...styles.text }}>
        {admission_Data?.m_name}
      </Text>
      <Text style={{ top: '140px', left: '450px', ...styles.text }}>
        {admission_Data?.religion_name}
      </Text>
      <Text style={{ top: '163px', left: '450px', ...styles.text }}>
        {admission_Data?.f_mob}
      </Text>
      <Text style={{ top: '187px', left: '150px', ...styles.text }}>
        {admission_Data?.m_mob}
      </Text>
      <Text style={{ top: '228px', left: '150px', ...styles.text }}>
        {admission_Data?.fee_group_name}
      </Text>
      <Text style={{ top: '228px', left: '290px', ...styles.text }}>
        {admission_Data?.slab_name}
      </Text>
      <Text style={{ top: '250px', left: '150px', ...styles.text }}>
        {admission_Data?.ac_close_yn}
      </Text>
      <Text style={{ top: '275px', left: '150px', ...styles.text }}>
        {admission_Data?.ac_close_date}
      </Text>
      <Text style={{ top: '300px', left: '150px', ...styles.text }}>
        {admission_Data?.tc_issue_yn}
      </Text>
      <Text style={{ top: '323px', left: '250px', ...styles.text }}>
        {admission_Data?.tc_issue_date}
      </Text>
      <Text style={{ top: '350px', left: '100px', ...styles.text }}>
        {admission_Data?.category_class}
      </Text>
      <Text style={{ top: '350px', left: '250px', ...styles.text }}>
        {tc_Issue_Master_Data?.tc_issue_yn}
      </Text>
      <Text style={{ top: '375px', left: '285px', ...styles.text }}>
        {tc_Issue_Master_Data?.tc_issue_date}
      </Text>
      <Text style={{ top: '375px', left: '405px', ...styles.text }}>
        {' '}
        {tc_Issue_Master_Data?.from_year}
      </Text>
      <Text style={{ top: '420px', left: '320px', ...styles.text }}>
        {tc_Issue_Master_Data?.file_no_1}
      </Text>
      <Text
        style={{
          top: '450px',
          left: '270px',
          color: 'green',
          fontStyle: 'Italic',
          fontWeight: 'bold',
          fontSize: '20px',
          position: 'absolute',
        }}
      >
        {tc_Issue_Master_Data?.narr_remark}
      </Text>
      <Text
        style={{
          top: '565px',
          left: '40px',
          width: 100,
          fontSize: '8px',
          flexShrink: 1,
          position: 'absolute',
        }}
      >
        {tc_Issue_Master_Data?.certificate_type}
      </Text>
      <Text
        style={{
          top: '575px',
          left: '40px',
          width: 100,
          fontSize: '8px',
          flexShrink: 1,
          position: 'absolute',
        }}
      >
        {tc_Issue_Master_Data?.possible_attend_days}
      </Text>
      <Text
        style={{
          top: '585px',
          left: '40px',
          width: 100,
          fontSize: '8px',
          flexShrink: 1,
          position: 'absolute',
        }}
      >
        {tc_Issue_Master_Data?.tc_issue_yn}
      </Text>
      <Text
        style={{
          top: '575px',
          left: '130px',
          width: 100,
          fontSize: '8px',
          flexShrink: 1,
          position: 'absolute',
        }}
      >
        {tc_Issue_Master_Data?.leave_taken_days}
      </Text>
      <Text
        style={{
          top: '575px',
          left: '200px',
          width: 100,
          fontSize: '8px',
          flexShrink: 1,
          position: 'absolute',
        }}
      >
        {tc_Issue_Master_Data?.result_detail}
      </Text>
      <Text
        style={{
          top: '575px',
          left: '270px',
          width: 100,
          fontSize: '8px',
          flexShrink: 1,
          position: 'absolute',
        }}
      >
        {tc_Issue_Master_Data?.promot_yn}
      </Text>
      <Text
        style={{
          top: '575px',
          left: '320px',
          width: 100,
          fontSize: '8px',
          flexShrink: 1,
          position: 'absolute',
        }}
      >
        {tc_Issue_Master_Data?.last_attended_date}
      </Text>
      <Text
        style={{
          top: '575px',
          left: '370px',
          width: 100,
          fontSize: '8px',
          flexShrink: 1,
          position: 'absolute',
        }}
      >
        {tc_Issue_Master_Data?.withdraw_date}
      </Text>
      <Text
        style={{
          top: '575px',
          left: '440px',
          width: 100,
          fontSize: '8px',
          flexShrink: 1,
          position: 'absolute',
        }}
      >
        {tc_Issue_Master_Data?.fee_remark}
      </Text>
      <Text
        style={{
          top: '575px',
          left: '510px',
          width: 100,
          fontSize: '8px',
          flexShrink: 1,
          position: 'absolute',
        }}
      >
        {admission_Data?.sadd1}
      </Text>
      <Text style={{ top: '630px', left: '130px', ...styles.text }}>
        {admission_Data?.sadd2}
      </Text>
      <Text style={{ top: '653px', left: '120px', ...styles.text }}>
        {admission_Data?.sadd3}
      </Text>
    </Page>
  </Document>
);
export default PdfView;
