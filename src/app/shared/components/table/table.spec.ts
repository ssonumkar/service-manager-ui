import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const mockData = [
    { id: '1', name: 'Test Item 1' },
    { id: '2', name: 'Test Item 2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.headers = ['ID', 'Name'];
    component.rows = mockData;
    component.actions = ['edit', 'delete'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit actionClick when emitAction is called', () => {
    spyOn(component.actionClick, 'emit');
    
    component.emitAction('edit', mockData[0]);
    
    expect(component.actionClick.emit).toHaveBeenCalledWith({
      action: 'edit',
      row: mockData[0]
    });
  });

  it('should display table headers', () => {
    expect(component.headers).toEqual(['ID', 'Name']);
  });

  it('should display table rows', () => {
    expect(component.rows).toEqual(mockData);
  });

  it('should display available actions', () => {
    expect(component.actions).toEqual(['edit', 'delete']);
  });
});
