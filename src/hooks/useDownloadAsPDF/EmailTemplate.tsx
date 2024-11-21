export const EmailTemplate = ({
  clientName = '',
  projectName = ''
}: {
  clientName?: string;
  projectName?: string;
}) => {
  return (
    <div style={{ width: '600px', boxSizing: 'border-box' }}>
      <div
        style={{
          backgroundColor: '#5350C3',
          color: '#FFFFFF',
          padding: '50px'
        }}
      >
        <div
          style={{ fontWeight: 110, fontSize: '36px', lineHeight: '42.96px' }}
        >
          Namaste!
        </div>
        <div
          style={{
            marginTop: '20px',
            fontWeight: 400,
            fontSize: '66px',
            lineHeight: '78.76px'
          }}
        >
          {clientName}.
        </div>
        <div
          style={{
            marginTop: '40px',
            fontWeight: 400,
            fontSize: '26px',
            lineHeight: '34px'
          }}
        >
          Here's your roadmap for your
        </div>
        <div style={{ fontWeight: 400, fontSize: '26px', lineHeight: '34px' }}>
          {projectName}
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          color: '#595959',
          padding: '50px',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '24px'
        }}
      >
        <div>
          <div>Thank you for reaching out! we are excited to collaborate</div>
          <div>with you for {projectName}.</div>
          <div style={{ marginTop: '20px' }}>
            Kindly book your free&nbsp;
            <a
              href="https://example.com/verify-email"
              target="_blank"
              style={{ color: '#007bff', textDecoration: 'underline' }}
            >
              consultation call
            </a>
            &nbsp;with our
          </div>
          <div>Design Team for more inputs.</div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#333333',
          color: '#FFFFFF',
          padding: '20px 50px',
          textAlign: 'center'
        }}
      >
        <div>&copy; Apptware 2024</div>
      </div>
    </div>
  );
};
